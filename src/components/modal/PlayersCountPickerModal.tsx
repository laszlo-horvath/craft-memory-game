import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import cx from "classnames";

interface ModalProps {
  isModalOpen: boolean;
  onCtaClick: (playersCount: number) => void;
}

export const PlayersCountPickerModal = ({ isModalOpen, onCtaClick }: ModalProps) => {
  const [playersCount, setPlayersCount] = useState(1);

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
                    How many players?
                  </Dialog.Title>

                  <div className="mt-2 flex gap-x-2">
                    <div
                      onClick={() => setPlayersCount(1)}
                      className={cx("flex-1 cursor-pointer text-xl flex flex-col items-center justify-center p-4 py-8 rounded-lg border-4 border-craft-blue transition-colors", {
                        "bg-craft-blue text-white": playersCount === 1,
                        "bg-white text-craft-blue": playersCount !== 1,
                      })}
                    >
                      1
                    </div>
                    <div onClick={() => setPlayersCount(2)} className={cx("flex-1 cursor-pointer text-xl flex flex-col items-center justify-center p-4 py-8 rounded-lg border-4 border-craft-purple transition-colors", {
                      "bg-craft-purple text-white": playersCount === 2,
                      "bg-white text-craft-purple": playersCount !== 2,
                    })}>
                      2
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent px-6 py-3 text-md font-bold bg-gradient-to-br from-craft-blue to-craft-purple text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => onCtaClick(playersCount)}
                    >
                      Let's play!
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