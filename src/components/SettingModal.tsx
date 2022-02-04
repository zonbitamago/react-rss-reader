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
import { Divider, Heading } from "@chakra-ui/react";
import { useUpdateDuration } from "../hooks/useUpdateDuration";
import { useArticleShowWeek } from "../hooks/useArticleShowWeek";
import { useCustomToast } from "../hooks/useCustomToast";

interface propsIF {
  isOpen: boolean;
  closeFunction: () => void;
}

const SettingModal = ({ isOpen, closeFunction }: propsIF) => {
  const [updateDuration, setUpdateDuration, setLocalUpdateDuration] =
    useUpdateDuration();
  const [articleShowWeek, setArticleShowWeek, setLocalArcileShowWeek] =
    useArticleShowWeek();

  const { showToast } = useCustomToast();

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
                showToast(`update failed`, "error");
                return;
              }

              const articleShowWeekValue = parseInt(articleShowWeek);
              if (isNaN(articleShowWeekValue)) {
                showToast(`update failed`, "error");
                return;
              }

              setLocalUpdateDuration(updateDurationValue);
              setLocalArcileShowWeek(articleShowWeekValue);

              showToast(`update success`, "success");
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
