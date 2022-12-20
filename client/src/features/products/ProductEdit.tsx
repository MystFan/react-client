import { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal';

import IProduct from '../../models/product.model';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import NegativeIcon from '../../app/common/components/NegativeIcon';

type ProductEditProps = {
  product?: IProduct,
  isOpen: boolean,
  close: Function,
  save: Function
}

const modalProduct: IProduct = {
  id: 0,
  name: "",
  price: 0,
  image: ""
}

const ProductEdit = (props: ProductEditProps) => {
  const [name, setName] = useState(props.product ? props.product.name : modalProduct.name);
  const [isNameValid, setNameIsValid] = useState(name !== "");
  const [isNameVisited, setNameIsVisited] = useState(false);
  const [price, setPrice] = useState(props.product ? props.product.price : modalProduct.price);
  const [isPriceValid, setPriceIsValid] = useState(price > 0);
  const [isPriceVisited, setPriceIsVisited] = useState(false);
  const [image, setImage] = useState(props.product ? props.product.image : modalProduct.image);
  const [isImageValid, setImageIsValid]
    = useState(props.product && props.product.image ? isValidHttpUrl(props.product.image) : true);
  const [isImageVisited, setImageIsVisited] = useState(false);
  const shouldShowNameError = !isNameValid && isNameVisited;
  const shouldShowPriceError = !isPriceValid && isPriceVisited;
  const shouldShowImageError = !isImageValid && isImageVisited;

  const handleChange = (event: any) => {
    const { name, value }: { name: string, value: string } = event.target;
    switch (name) {
      case "name":
        setNameIsValid(value !== "");
        setName(value);
        break;
      case "price":
        setPriceIsValid(Number(value) > 0);
        setPrice(Number(value));
        break;
      case "image":
        value ? setImageIsValid(isValidHttpUrl(value)) : setImageIsValid(true);
        setImage(value);
        break;
    }
  }

  const handleSave = () => {
    // TODO: update or create http request and update state
    console.log({ name: name, price: price, image: image, id: props.product?.id });
  }

  return (
    <>
      <Modal onClose={() => props.close()} isOpen={props.isOpen}>
        <ModalHeader>{ props.product && props.product?.id ? name : "New Product"}</ModalHeader>
        <ModalBody>
          <FormControl label="Name" error={shouldShowNameError ? 'Please input a valid Name' : null}>
            <Input name="name"
              autoFocus={true}
              onBlur={() => setNameIsVisited(true)}
              error={shouldShowNameError}
              overrides={shouldShowNameError ? { After: NegativeIcon } : {}}
              onChange={handleChange} value={name} />
          </FormControl>
          <FormControl label="Price"  error={shouldShowPriceError ? 'Please input a valid Price' : null}>
            <Input name="price" type='number'
              onBlur={() => setPriceIsVisited(true)}
              error={shouldShowPriceError}
              overrides={shouldShowPriceError ? { After: NegativeIcon } : {}}
              onChange={handleChange} value={price} />
          </FormControl>
          <FormControl label="Image Url"  error={shouldShowImageError ? 'Please input a valid Image Url' : null}>
            <Input name="image"
              onBlur={() => setImageIsVisited(true)}
              error={shouldShowImageError}
              overrides={shouldShowImageError ? { After: NegativeIcon } : {}}
              onChange={handleChange} value={image} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <ModalButton kind="tertiary" onClick={() => props.close()}>
            Cancel
          </ModalButton>
          <ModalButton onClick={() => handleSave()}>Save</ModalButton>
        </ModalFooter>
      </Modal>
    </>
  );
}

const isValidHttpUrl = (value: string) => {
  let url;
  try {
    url = new URL(value);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

export default ProductEdit;
