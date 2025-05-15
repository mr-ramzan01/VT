import React from 'react';
import Button from '@/components/v1/ui/Button';

interface ConnectWalletButtonProps {
  onClick: () => void;
  className?: string;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  onClick,
  className = ''
}) => {
  return (
    <Button
      onClick={onClick}
      className={`bg-[#8A2BE2] hover:bg-[#7B24CA] text-white font-medium ${className}`}
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectWalletButton; 