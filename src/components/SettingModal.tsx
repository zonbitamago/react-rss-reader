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
import { articleShowWeekAtom, updateDurationAtom } from "../recoil/Atoms";
import * as ls from "local-storage";
import { Divider, Heading } from "@chakra-ui/react";

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

  const [recoilArticleShowWeek, setRecoilArticleShowWeek] =
    useRecoilState(articleShowWeekAtom);
  const [articleShowWeek, setArticleShowWeek] = useState(
    recoilArticleShowWeek.toString()
  );

  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={closeFunction}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading size="sm">更新間隔</Heading>
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
          <Divider mt={4} mb={4} />
          <Heading size="sm">記事表示期間</Heading>
          <InputGroup size="sm">
            <Input
              placeholder="show week"
              value={articleShowWeek}
              onChange={(e) => {
                setArticleShowWeek(e.target.value);
              }}
            />
            <InputRightAddon children="week" />
          </InputGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => {
              const updateDurationValue = parseInt(updateDuration);
              if (isNaN(updateDurationValue)) {
                toast({
                  title: `update failed!`,
                  status: "error",
                  isClosable: true,
                });
                return;
              }

              const articleShowWeekValue = parseInt(articleShowWeek);
              if (isNaN(articleShowWeekValue)) {
                toast({
                  title: `update failed!`,
                  status: "error",
                  isClosable: true,
                });
                return;
              }

              setRecoilUpdateDuration(updateDurationValue);
              ls.set<number>("updateDurationAtom", updateDurationValue);

              setRecoilUpdateDuration(articleShowWeekValue);
              ls.set<number>("articleShowWeekAtom", articleShowWeekValue);

              toast({
                title: `update success!`,
                status: "success",
                isClosable: true,
              });
            }}>
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
