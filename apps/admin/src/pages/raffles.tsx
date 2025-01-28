import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Anchor,
  Button,
  Flex,
  Group,
  Image,
  Modal,
  NumberInput,
  Space,
  Table,
  Text,
  TextInput,
  Title,
  useMantineTheme
} from '@mantine/core';
import { IconCheck, IconPhoto, IconPlus, IconUpload, IconX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { DateTimePicker } from '@mantine/dates';
import { getAllRaffles } from 'database';
import axios from 'axios';
import { ISafeRaffle } from 'types';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import dateFormat from 'dateformat';
import { notifications } from '@mantine/notifications';
import { useCookies } from 'react-cookie';
import { usePermissions } from '@/hooks/permissions';
import Layout from '@/components/Layout';

export async function getServerSideProps() {
  const raffles = await getAllRaffles();

  return {
    props: {
      raffles: {
        currentRaffles: raffles.currentRaffles.filter(r => r.timestampEnd > Date.now()),
        pastRaffles: raffles.pastRaffles.filter(r => r.timestampEnd <= Date.now())
      }
    }
  };
}

function getUrl() {
  if (typeof window !== 'undefined') {
    if (process.env.NODE_ENV === 'production') {
      return window.location.hostname.includes('localhost') 
        ? 'http://localhost:8007' 
        : 'https://tck.gg';
    }
    return 'http://localhost:8000';
  }
  return '';
}

function showErrorNotification(status: number) {
  if (status === 400) {
    notifications.show({
      title: 'Bad Request',
      message: 'Try again.',
      color: 'red',
      icon: <IconX />,
      withBorder: true,
      autoClose: 10000
    });
  }
  if (status === 401 || status === 403) {
    notifications.show({
      title: 'Error',
      message: 'You are not authorized to do this. Ask the developer for permission.',
      color: 'red',
      icon: <IconX />,
      withBorder: true,
      autoClose: 10000
    });
    return;
  }
  if (status === 404) {
    notifications.show({
      title: 'Error',
      message: 'Giveaway not found. Notify the developer.',
      color: 'red',
      icon: <IconX />,
      withBorder: true,
      autoClose: 10000
    });
    return;
  }
  if (status === 500) {
    notifications.show({
      title: 'Internal Server Error',
      message: 'An internal server error occurred.',
      color: 'red',
      icon: <IconX />,
      withBorder: true,
      autoClose: 10000
    });
  }
}

function Raffles({ raffles }: { 
  raffles: {
    currentRaffles: ISafeRaffle[];
    pastRaffles: ISafeRaffle[];
  };
}) {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const router = useRouter();
  const permissions = usePermissions();
  const [cookie] = useCookies(['authorization']);
  const [disabled, setDisabled] = useState(false);

  const [name, setName] = useState('');
  const [value, setValue] = useState<number | ''>(0);
  const [maxEntries, setMaxEntries] = useState<number | ''>(0);
  const [maxWinners, setMaxWinners] = useState<number | ''>(1);
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [images, setImages] = useState<FileWithPath[]>([]);
  const [editId, setEditId] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (!permissions.permissions.includes('MANAGE_RAFFLES')) {
      setTimeout(() => router.push('/'), 3000);
    }
  }, [permissions, router]);

  useEffect(() => {
    setDisabled(
      !name ||
      !value ||
      !maxEntries ||
      !maxWinners ||
      !endDate ||
      endDate < new Date() ||
      (modalMode === 'create' && images.length === 0)
    );
  }, [name, value, maxEntries, maxWinners, endDate, images, modalMode]);

  async function handleSubmitRaffle() {
    setDisabled(true);

    if (!name || !value || !maxEntries || !maxWinners || !endDate) return;

    const payload = {
      name: name.trim(),
      value,
      maxEntries,
      maxWinners,
      timestampEnd: endDate.getTime(),
      image: images[0] ? Buffer.from(await images[0].arrayBuffer()).toString('base64') : undefined
    };

    try {
      const endpoint = modalMode === 'create' 
        ? '/api/v1/raffles/create' 
        : '/api/v1/raffles/update';
      
      const response = await axios.post(`${getUrl()}${endpoint}`, 
        modalMode === 'edit' ? { ...payload, id: editId } : payload,
        { headers: { authorization: cookie.authorization } }
      );

      if (response.status === 200) {
        router.replace(router.asPath);
        notifications.show({
          title: `Raffle ${modalMode === 'create' ? 'created' : 'updated'}`,
          message: `Raffle "${name}" successfully ${modalMode === 'create' ? 'created' : 'updated'}`,
          color: 'teal',
          icon: <IconCheck />
        });
        handleClose();
      }
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: `Failed to ${modalMode === 'create' ? 'create' : 'update'} raffle`,
        color: 'red',
        icon: <IconX />
      });
    }
    setDisabled(false);
  }

  async function handleDeleteRaffle() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    setDisabled(true);
    try {
      await axios.post(`${getUrl()}/api/v1/raffles/delete`, 
        { id: editId },
        { headers: { authorization: cookie.authorization }, validateStatus: () => true }
      );
      router.replace(router.asPath);
      notifications.show({
        title: 'Raffle deleted',
        message: `Raffle "${name}" was successfully deleted`,
        color: 'teal',
        icon: <IconCheck />
      });
      handleClose();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete raffle',
        color: 'red',
        icon: <IconX />
      });
    }
    setDisabled(false);
  }

  function handleClose() {
    close();
    setName('');
    setValue(0);
    setMaxEntries(0);
    setMaxWinners(1);
    setEndDate(new Date());
    setImages([]);
    setEditId('');
    setConfirmDelete(false);
  }

  function handleEditClick(raffle: ISafeRaffle) {
    setName(raffle.name);
    setValue(raffle.value);
    setMaxEntries(raffle.maxEntries);
    setMaxWinners(raffle.maxWinners);
    setEndDate(new Date(raffle.timestampEnd));
    setEditId(raffle.id);
    setModalMode('edit');
    open();
  }

  return (
    <Layout>
      {permissions.permissions.includes('MANAGE_RAFFLES') ? (
        <>
          <Title mb="sm">Raffles Management</Title>
          
          <Button leftIcon={<IconPlus />} onClick={() => { setModalMode('create'); open(); }} mb="sm">
            New Raffle
          </Button>

          <Title order={2} mb="sm">Active Raffles</Title>
          {raffles.currentRaffles.length > 0 ? (
            <Table highlightOnHover withBorder>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Value</th>
                  <th>Entries</th>
                  <th>Max Winners</th>
                  <th>End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {raffles.currentRaffles.map(raffle => (
                  <tr key={raffle.id}>
                    <td><Image src={raffle.image} width={60} alt={raffle.name} /></td>
                    <td>{raffle.name}</td>
                    <td>${raffle.value.toLocaleString()}</td>
                    <td>{raffle.entries.length}/{raffle.maxEntries}</td>
                    <td>{raffle.maxWinners}</td>
                    <td>{dateFormat(raffle.timestampEnd, 'mmm dd, yyyy HH:MM')}</td>
                    <td>
                      <Anchor component="button" onClick={() => handleEditClick(raffle)}>
                        Edit
                      </Anchor>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : <Text>No active raffles</Text>}

          <Title order={2} mt="xl" mb="sm">Past Raffles</Title>
          {raffles.pastRaffles.length > 0 ? (
            <Table highlightOnHover withBorder>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Winners</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {raffles.pastRaffles.map(raffle => (
                  <tr key={raffle.id}>
                    <td><Image src={raffle.image} width={60} alt={raffle.name} /></td>
                    <td>{raffle.name}</td>
                    <td>
                      {raffle.winners.length > 0 
                        ? raffle.winners.map(w => w).join(', ')
                        : 'No winners'}
                    </td>
                    <td>{dateFormat(raffle.timestampEnd, 'mmm dd, yyyy')}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : <Text>No past raffles</Text>}

          <Modal
            opened={opened}
            onClose={handleClose}
            title={`${modalMode === 'create' ? 'Create' : 'Edit'} Raffle`}
            size="lg"
          >
            <TextInput
              label="Raffle Name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              required
              mb="sm"
            />

            <NumberInput
              label="Item Value ($)"
              value={value}
              onChange={setValue}
              min={0}
              precision={2}
              required
              mb="sm"
            />

            <NumberInput
              label="Max Entries"
              value={maxEntries}
              onChange={setMaxEntries}
              min={1}
              required
              mb="sm"
            />

            <NumberInput
              label="Max Winners"
              value={maxWinners}
              onChange={setMaxWinners}
              min={1}
              required
              mb="sm"
            />

            <DateTimePicker
              label="End Date"
              value={endDate}
              onChange={setEndDate}
              minDate={new Date()}
              required
              mb="sm"
            />

            {modalMode === 'create' && (
              <Dropzone
                onDrop={setImages}
                accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
                maxSize={5 * 1024 ** 2}
                maxFiles={1}
                mb="sm"
              >
                <Group position="center" spacing="xl" style={{ minHeight: 100 }}>
                  <Dropzone.Accept>
                    <IconUpload size={40} color={theme.colors.green[6]} />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX size={40} color={theme.colors.red[6]} />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto size={40} />
                  </Dropzone.Idle>
                  <Text size="sm" align="center">
                    Drag image here or click to upload (max 5MB)
                  </Text>
                </Group>
              </Dropzone>
            )}

            {images[0] && (
              <Image 
                src={URL.createObjectURL(images[0])} 
                alt="Preview" 
                height={200} 
                fit="contain" 
                mb="sm"
              />
            )}

            <Button 
              fullWidth 
              onClick={handleSubmitRaffle}
              disabled={disabled}
              mb="sm"
            >
              {modalMode === 'create' ? 'Create' : 'Update'} Raffle
            </Button>

            {modalMode === 'edit' && (
              <Button
                fullWidth
                color="red"
                onClick={handleDeleteRaffle}
                disabled={disabled}
              >
                {confirmDelete ? 'Confirm Deletion' : 'Delete Raffle'}
              </Button>
            )}
          </Modal>
        </>
      ) : (
        <Text color="red" size="lg">
          Missing permissions. Redirecting...
        </Text>
      )}
    </Layout>
  );
}

export default Raffles;