import Modal from '@/components/common/Modal'
import Link from 'next/link'
import { FiLogOut } from 'react-icons/fi'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { useAccount, useDisconnect } from 'wagmi'

interface ConnectWalletModalProps {
  openModal: boolean
  handleClose: () => void
}

export default function ModalInfoAddress({ openModal, handleClose }: ConnectWalletModalProps) {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  const handleDisconnect = async () => {
    disconnect()
    handleClose()
  }

  return (
    <>
      <Modal
        className="w-full max-w-[500px]  bg-[#11112C] p-[12px]"
        open={openModal}
        handleClose={handleClose}
        hideCloseIcon
      ></Modal>
    </>
  )
}
