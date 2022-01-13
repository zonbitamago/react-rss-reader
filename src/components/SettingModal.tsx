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
import { Divider, Heading } from "@chakra-ui/react";
import { useUpdateDuration } from "../hooks/useUpdateDuration";
import { useArticleShowWeek } from "../hooks/useArticleShowWeek";

interface propsIF {
  isOpen: boolean;
  closeFunction: () => void;
}

const SettingModal = ({ isOpen, closeFunction }: propsIF) => {
  const [updateDuration, setUpdateDuration, setLocalUpdateDuration] =
    useUpdateDuration();
  const [articleShowWeek, setArticleShowWeek, setLocalArcileShowWeek] =
    useArticleShowWeek();

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

              setLocalUpdateDuration(updateDurationValue);
              setLocalArcileShowWeek(articleShowWeekValue);

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
