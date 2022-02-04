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
import {
  Divider,
  InputLeftAddon,
  Link,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoBarcodeOutline, IoCloseCircleOutline } from "react-icons/io5";
import { useRecoilState } from "recoil";
import rfdc from "rfdc";
import { rssSettingListAtom } from "../recoil/Atoms";
import * as ls from "local-storage";
import { getParseTempResult } from "../domain/Parser";
import { useCustomToast } from "../hooks/useCustomToast";

const clone = rfdc();

interface propsIF {
  isOpen: boolean;
  closeFunction: () => void;
}

const RssModal = ({ isOpen, closeFunction }: propsIF) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [recoilRssSettingList, setRecoilRssSettingList] =
    useRecoilState(rssSettingListAtom);
  const { showToast } = useCustomToast();

  const addRSSToList = async () => {
    const isValidTitle = title.length > 0;
    if (!isValidTitle) {
      showToast(`update fail:invalidTitle`, "error");
      return;
    }

    const tmpResult = await getParseTempResult([
      { site_name: title, url: url },
    ]);
    const isValidURL = tmpResult.data.results[0].result;
    if (!isValidURL) {
      showToast(`update fail:invalidURL`, "error");
      return;
    }

    const cloneList = clone(recoilRssSettingList);
    cloneList.push({ title: title, url: url });
    setRecoilRssSettingList(cloneList);
    ls.set("rssSettingListAtom", cloneList);
    showToast(`update success!`, "success");
  };

  const rssListArea = recoilRssSettingList.map((elem, idx) => {
    return (
      <ListItem key={idx}>
        <ListIcon as={IoBarcodeOutline} color="green.500" />
        <Link href={elem.url} isExternal color="blue.400" mr={3}>
          {elem.title}
        </Link>
        <ListIcon
          as={IoCloseCircleOutline}
          color="red"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            const deletedList = recoilRssSettingList.filter((element) => {
              return element.title !== elem.title;
            });
            setRecoilRssSettingList(deletedList);
            showToast(`delete success!`, "success");
          }}
        />
      </ListItem>
    );
  });

  return (
    <Modal isOpen={isOpen} onClose={closeFunction}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>RSSList</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List maxH={"50vh"} overflow="auto">
            {rssListArea}
          </List>
          <Divider />
          <InputGroup mt={3} mb={3}>
            <InputLeftAddon children="Title" />
            <Input
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="URL" />
            <Input
              placeholder="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </InputGroup>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={addRSSToList}>
            Add
          </Button>
          <Button colorScheme="blue" mr={3} onClick={closeFunction}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RssModal;
