import { useState, useEffect } from 'react';
import {
    Button,
    TextInput,
    Modal,
    Title,
    Table,
    Anchor,
    Text,
    Select
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconPlus, IconX } from '@tabler/icons-react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { usePermissions } from '@/hooks/permissions';
import dateFormat from 'dateformat';
import Layout from '@/components/Layout';
import axios from 'axios';
import { getAllClips } from 'database';

type Clip = {
    id: string;
    title: string;
    platform: 'KICK' | 'YOUTUBE' | 'TIKTOK' | 'TWITTER' | 'INSTAGRAM';
    videoClip: string;
    authorUser: string;
    authorPfp: string;
    createdAt: string;
    votes: {
        upvotes: number;
        downvotes: number;
    };
};

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

export async function getServerSideProps() {
    const clips = await getAllClips();

    const serializedClips = clips.map(clip => ({
        ...clip,
        updatedAt: clip.updatedAt.toISOString(),
        createdAt: clip.createdAt.toISOString()
    }));
    return {
        props: {
            clips: serializedClips
        }
    };
}

function Clips({ clips }: { clips: Clip[] }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const router = useRouter();
    const permissions = usePermissions();
    const [cookie] = useCookies(['authorization']);
    const [disabled, setDisabled] = useState(false);

    // Form states
    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState<'KICK' | 'YOUTUBE' | 'TIKTOK' | 'TWITTER' | 'INSTAGRAM'>('KICK');
    const [authorUser, setAuthorUser] = useState<string | null>('');
    const [authorPfp, setAuthorPfp] = useState<string | null>('');
    const [videoClip, setClipUrl] = useState('');
    const [editId, setEditId] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        if (!permissions.permissions.includes('MANAGE_CLIPS')) {
            setTimeout(() => router.push('/'), 3000);
        }
    }, [permissions, router]);

    useEffect(() => {
        setDisabled(!title || !videoClip);
    }, [title, videoClip]);

    async function handleSubmitClip() {
        setDisabled(true);

        const payload = {
            title: title.trim(),
            platform,
            videoClip,
            authorUser,
            authorPfp,
        };

        try {
            const endpoint = modalMode === 'create' ? '/api/v1/clip/create' : '/api/v1/clip/update';
            const response = await axios.post(
                `${getUrl()}${endpoint}`,
                modalMode === 'edit' ? { ...payload, id: editId } : payload,
                { headers: { authorization: cookie.authorization } }
            );

            if (response.status === 200) {
                router.replace(router.asPath);
                notifications.show({
                    title: `Clip ${modalMode === 'create' ? 'created' : 'updated'}`,
                    message: `Clip "${title}" was successfully ${modalMode === 'create' ? 'created' : 'updated'}`,
                    color: 'teal',
                    icon: <IconCheck />
                });
                handleClose();
            }
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: `Failed to ${modalMode === 'create' ? 'create' : 'update'} clip`,
                color: 'red',
                icon: <IconX />
            });
            console.log(error)
        }
        setDisabled(false);
    }

    async function handleDeleteClip() {
        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        }

        setDisabled(true);
        try {
            await axios.post(
                `${getUrl()}/api/v1/clips/delete`,
                { id: editId },
                { headers: { authorization: cookie.authorization } }
            );
            router.replace(router.asPath);
            notifications.show({
                title: 'Clip deleted',
                message: `Clip "${title}" was successfully deleted`,
                color: 'teal',
                icon: <IconCheck />
            });
            handleClose();
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Failed to delete clip',
                color: 'red',
                icon: <IconX />
            });
        }
        setDisabled(false);
    }

    function handleClose() {
        close();
        setTitle('');
        setClipUrl('');
        setPlatform('KICK');
        setEditId('');
        setConfirmDelete(false);
    }

    function handleEditClick(clip: Clip) {
        setTitle(clip.title);
        setPlatform(clip.platform);
        setClipUrl(clip.videoClip);
        setEditId(clip.id);
        setAuthorPfp(clip.authorPfp);
        setAuthorUser(clip.authorUser);
        setModalMode('edit');
        open();
    }

    return (
        <Layout>
            {permissions.permissions.includes('MANAGE_CLIPS') ? (
                <>
                    <Title mb="sm">Clips Management</Title>

                    <Button leftIcon={<IconPlus />} onClick={() => { setModalMode('create'); open(); }} mb="sm">
                        New Clip
                    </Button>

                    <Table highlightOnHover withBorder>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Platform</th>
                                <th>Author</th>
                                <th>Created At</th>
                                <th>Votes</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clips.map(clip => (
                                <tr key={clip.id}>
                                    <td>{clip.title}</td>
                                    <td>{clip.platform}</td>
                                    <td>{clip.authorUser}</td>
                                    <td>{dateFormat(new Date(clip.createdAt).getTime(), 'mmm dd, yyyy HH:MM')}</td>
                                    <td>👍 {clip.votes.upvotes ? clip.votes.upvotes : 0} 👎  {clip.votes.downvotes ? clip.votes.downvotes : 0}</td>
                                    <td>
                                        <Anchor component="button" onClick={() => handleEditClick(clip)}>
                                            Edit
                                        </Anchor>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Modal
                        opened={opened}
                        onClose={handleClose}
                        title={`${modalMode === 'create' ? 'Create' : 'Edit'} Clip`}
                        size="lg"
                    >
                        <TextInput
                            label="Clip Title"
                            value={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                            required
                            mb="sm"
                        />

                        <Select
                            label="Platform"
                            value={platform}
                            onChange={(value) => setPlatform(value as typeof platform)}
                            data={[
                                { value: 'KICK', label: 'Kick' },
                                { value: 'YOUTUBE', label: 'YouTube' },
                                { value: 'TIKTOK', label: 'TikTok' },
                                { value: 'TWITTER', label: 'Twitter' },
                                { value: 'INSTAGRAM', label: 'Instagram' }
                            ]}
                            required
                            mb="sm"
                        />

                        <TextInput
                            label="Clip URL"
                            value={videoClip}
                            onChange={(e) => setClipUrl(e.currentTarget.value)}
                            required
                            mb="sm"
                        />

                        <TextInput
                            label="Author Username (Optional)"
                            value={authorUser || ''}
                            onChange={(e) => setAuthorUser(e.currentTarget.value || null)}
                            mb="sm"
                        />

                        <TextInput
                            label="Author Profile Picture URL (Optional)"
                            value={authorPfp || ''}
                            onChange={(e) => setAuthorPfp(e.currentTarget.value || null)}
                            mb="sm"
                        />

                        <Button
                            fullWidth
                            onClick={handleSubmitClip}
                            disabled={disabled}
                            mb="sm"
                        >
                            {modalMode === 'create' ? 'Create' : 'Update'} Clip
                        </Button>

                        {modalMode === 'edit' && (
                            <Button
                                fullWidth
                                color="red"
                                onClick={handleDeleteClip}
                                disabled={disabled}
                            >
                                {confirmDelete ? 'Confirm Deletion' : 'Delete Clip'}
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

export default Clips;