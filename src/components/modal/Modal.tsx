import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useSound from 'use-sound';
import { selectBest } from "components/counter/counterSlice";
import { useAppSelector } from "redux/hooks";

interface ModalProps {
  isModalOpen: boolean;
  onCtaClick: () => void;
}

const titles = ["Pawsome Victory!", "Top Dog Triumph!", "Bark-tastic Success!"];

const messages = [
  ["Pawsitively brilliant, you've matched all the mutts!", "Can you out-fetch your own record? Give it a go!"],
  ["Bow-WOW, you've aced the doggy duos!", "Feeling frisky? Try to top your own high score!"],
  ["You've sniffed out success in this tail-wagging challenge!", "Ready for a rematch? Go ahead, outdo your best score!"],
];

const gifs = [
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWU3OGE5YWYyMzU0YWE4NTE0NjZjMGNjM2FkYTllZmI0MjVmMjhkZSZjdD1n/pHZdGyFNp5sUXq4jp5/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmE0OGRkMGFlMDNhN2M5Yjc3NzhlMmJmYmMyZmExMjQ0ODM3NDFmNCZjdD1n/m5SLTWdACYbUe9Ge9F/giphy.gif",
  "https://media2.giphy.com/media/l3vR3SsWC9b87lT0s/giphy.gif?cid=ecf05e47pgrfs4j00socjshtbtjgfbf0x5dc1cljrlmaq2p1&rid=giphy.gif&,"
];

const getRandomTitle = () => titles[Math.floor(Math.random() * titles.length)];
const getRandomMessage = () => messages[Math.floor(Math.random() * messages.length)];
const getRandomGif = () => gifs[Math.floor(Math.random() * gifs.length)];

export const Modal = ({ isModalOpen, onCtaClick }: ModalProps) => {
  const [title, setTitle] = useState(getRandomTitle());
  const [descriptions, setDescriptions] = useState(getRandomMessage());
  const [gif, setGif] = useState(getRandomGif());
  const best = useAppSelector(selectBest);

  const [playTadaSound] = useSound(['/sounds/tada.ogg', '/sounds/tada.m4a']);

  const [message1, message2] = descriptions;

  useEffect(() => {
    if (isModalOpen) {
      playTadaSound();
      setTitle(getRandomTitle());
      setDescriptions(getRandomMessage());
      setGif(getRandomGif());
    }
  }, [isModalOpen]);

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>{}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-opacity-25 bg-gradient-to-r from-craft-blue to-pink-600 via-craft-purple animate-gradient-x" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md text-center transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="font-extrabold text-transparent text-2xl lg:text-5xl leading-tight bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6"
                  >
                    {title} 🎉
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="my-4 min-h-[30vh]">
                      <img className="rounded-lg mx-auto !h-[calc(30vh)]" src={gif} alt="Happy Dog Gif" />
                    </div>
                    <p className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                      Your top-dog record stands at <span className="">{best}</span> moves!
                    </p>
                    <p className="text-sm text-gray-500">
                      {message1}<br/>{message2}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent px-6 py-3 text-md font-bold bg-gradient-to-br from-craft-blue to-craft-purple text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => onCtaClick()}
                    >
                      Play again
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
};