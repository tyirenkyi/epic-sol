import { createRef, useEffect, useState, useRef, useContext } from "react";
import { Modal } from "@mui/material"
import {
  encodeURL,
  findTransactionSignature,
  FindTransactionSignatureError,
  createQR,
} from "@solana/pay";
import BigNumber from "bignumber.js";
import { Keypair, PublicKey } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

//contexts
import { CartContext } from "../../contexts/CartProvider";

interface Props {
  open: boolean;
  closeModal: () => void;
  orderId: string;
  total: number;
}

const SolanaPayModal = ({ open, closeModal, orderId, total } : Props) => {
  const { updateProducts } = useContext(CartContext);
  const router = useRouter();
  const qrRef = createRef<HTMLDivElement>();
  const reference = new Keypair().publicKey;
  const { connection } = useConnection();
  let timer = useRef<NodeJS.Timeout>();  

  const createPaymentLink = () => {    
    const url = encodeURL({
      recipient: new PublicKey("8ixmyB5JqXWSAUVxZgXudUMWjqtonCTqC5FennQ1dJc8"),
      amount: new BigNumber(total),
      label: "Game store",
      message: `Game store - your order - ${orderId}`,
      reference: reference,
    });

    const qrCode = createQR(url);
    qrCode.append(qrRef.current);
  };



  useEffect(() => {
    setTimeout(() => {
      createPaymentLink();
    }, 1000);
  }, [open])

  useEffect(() => {
    timer.current =  setInterval(async () => {      
      try {
        const data = await findTransactionSignature(connection, reference, undefined, 'confirmed');
        console.log('\n 🖌  Signature found: ', data.signature);
        toast.success('✅ Payment validated');
        updateProducts([]);
        await axios.post("https://epic-sol.vercel.app/api/payment", { status: "paid", order_id: orderId })
        .then(res => {
          toast.success("Payment received");
          router.push("/");
        })
        .catch(err => {
          console.error(err);
        })
        clearInterval(timer.current);
      } catch (error: any) {
        if (!(error instanceof FindTransactionSignatureError)) {
          console.error(error);
          clearInterval(timer.current);
        }
      }
    }, 250);
    return (() => {
      clearInterval(timer.current);
    })
  }, [])

  return (
    <Modal
      open={open}
      onClose={closeModal}
      className="flex items-center justify-center outline-none ring-0"
    >
      <div className="p-2 bg-white rounded-md aspect-square">
        <div 
          ref={qrRef}
        ></div>
        <div className="flex flex-col items-center justify-center">
          <p className="mt-4 font-bold text-center">
            Scan this code with your Solana Pay wallet
          </p>
          <p>You will be asked to approve the transaction</p>
        </div>
      </div>
    </Modal>
  )
}

export default SolanaPayModal;
