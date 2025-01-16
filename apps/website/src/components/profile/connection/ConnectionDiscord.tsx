import { useEffect, useState } from 'react';

import ProfileConnection from '@/components/profile/ProfileConnection/ProfileConnection';
import DiscordColored from '@/components/svg/DiscordColored';

import { useAuth } from '@/hooks/auth';

const SCOPE = 'identify+email';

function ConnectionDiscord() {
  const auth = useAuth();

  const [disabled, setDisabled] = useState<boolean>(false);

  function handleClick() {
    setDisabled(true);

    if (process.env.NODE_ENV === 'development') {
      window.location.href = `https://discord.com/oauth2/authorize?client_id=1235825492872007791&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A8000&scope=${SCOPE}&state=${auth.user?.id}`;
    } else if (process.env.NODE_ENV === 'production') {
      window.location.href = `https://discord.com/oauth2/authorize?client_id=1235825492872007791&response_type=token&redirect_uri=https%3A%2F%2Ftck.gg&scope=${SCOPE}&state=${auth.user?.id}`;
    }
  }

  return (
    <ProfileConnection
      name='Discord'
      color='#5865f2'
      icon={<DiscordColored />}
      username={auth.user?.accounts?.discord?.discordUsername}
      onClick={handleClick}
      disabled={disabled}
    />
  );
}

export default ConnectionDiscord;
