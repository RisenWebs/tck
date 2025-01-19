import { useRewardsContextMenu } from '@/hooks/rewards-context-menu';
import { AnimatePresence } from 'framer-motion';

import HeaderItemRewardsContextMenu from '../HeaderItemRewardsContextMenu/HeaderItemRewardsContextMenu';

import Dropdown from '@/components/svg/Dropdown';
import Gift from '@/components/svg/Gift';

import classes from './HeaderItemRewards.module.scss';

function HeaderItemRewards() {
  const rewardsContextMenu = useRewardsContextMenu();

  function handleClick() {
    rewardsContextMenu.toggle();
  }

  return (
    <div className={classes.root}>
      <div className={classes.display} onClick={handleClick}>
        <Gift />
        <span className="bg-[linear-gradient(90deg,_#18A9FF_0%,_#9229FF_100%)] bg-clip-text text-transparent font-bold">REWARDS</span>
        <Dropdown />
      </div>
      <AnimatePresence>
        {rewardsContextMenu.isOpen && <HeaderItemRewardsContextMenu />}
      </AnimatePresence>
    </div>
  );
}

export default HeaderItemRewards;
