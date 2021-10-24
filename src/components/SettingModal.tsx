import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { updateDurationAtom } from "../recoil/Atoms";
import * as ls from "local-storage";

interface propsIF {
  isOpen: boolean;
  closeFunction: () => void;
}

const SettingModal = ({ isOpen, closeFunction }: propsIF) => {
  const [recoilUpdateDuration, setRecoilUpdateDuration] =
    useRecoilState(updateDurationAtom);
  const [updateDuration, setUpdateDuration] = useState(
    recoilUpdateDuration.toString()
  );
  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={closeFunction}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>更新間隔</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup size="sm">
            <Input
              placeholder="update duration"
              value={updateDuration}
              onChange={(e) => {
                setUpdateDuration(e.target.value);
              }}
            />
            <InputRightAddon children="min" />
          </InputGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => {
              const value = parseInt(updateDuration);
              if (isNaN(value)) {
                toast({
                  title: `update failed!`,
                  status: "error",
                  isClosable: true,
                });
                return;
              }

              setRecoilUpdateDuration(value);
              ls.set<number>("updateDurationAtom", value);
              toast({
                title: `update success!`,
                status: "success",
                isClosable: true,
              });
            }}
          >
            Update
          </Button>
          <Button colorScheme="blue" mr={3} onClick={closeFunction}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SettingModal;
