import { Button } from "@chakra-ui/button";
import { Input, InputGroup } from "@chakra-ui/input";
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
import { useTwitterSetting } from "../hooks/useTwitterSetting";
import { useCustomToast } from "../hooks/useCustomToast";

interface propsIF {
  isOpen: boolean;
  closeFunction: () => void;
}

const TwitterModal = ({ isOpen, closeFunction }: propsIF) => {
  const twitterSetting = useTwitterSetting();
  const { showToast } = useCustomToast();

  return (
    <Modal isOpen={isOpen} onClose={closeFunction}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Twitter Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading size="sm">List ID</Heading>
          <InputGroup size="sm">
            <Input
              placeholder="List ID"
              value={twitterSetting.listId}
              onChange={(e) => {
                twitterSetting.setListId(e.target.value);
              }}
            />
          </InputGroup>
          <Divider mt={4} mb={4} />
          <Heading size="sm">Bearer Token</Heading>
          <InputGroup size="sm">
            <Input
              placeholder="Bearer Token"
              value={twitterSetting.bearerToken}
              onChange={(e) => {
                twitterSetting.setBearerToken(e.target.value);
              }}
            />
          </InputGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => {
              twitterSetting.setLocalTwitterSetting(
                twitterSetting.listId,
                twitterSetting.bearerToken
              );

              showToast(`update success!`, "success");
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

export default TwitterModal;
