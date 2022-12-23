import { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import NegativeIcon from '../../app/common/components/NegativeIcon';

import IProduct from '../../models/product.model';
import { AppState } from '../../store/appState';
import ProductActions from '../../store/products/product.actions';

type ProductEditProps = {
  product?: IProduct,
  isOpen: boolean,
  close: Function,
  save: Function,
  createProduct: Function,
  updateProduct: Function
}

const ProductEdit = (props: ProductEditProps) => {
  const [name, setName] = useState(props.product ? props.product.name : "");
  const [isNameValid, setNameIsValid] = useState(name !== "");
  const [isNameVisited, setNameIsVisited] = useState(false);
  const [price, setPrice] = useState(props.product ? props.product.price : 0);
  const [isPriceValid, setPriceIsValid] = useState(price > 0);
  const [isPriceVisited, setPriceIsVisited] = useState(false);
  const [image, setImage] = useState(props.product ? props.product.image : "");
  const [isImageValid, setImageIsValid] = useState(props.product?.image ? isValidHttpUrl(props.product?.image) : props.product?.image);
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
        setImageIsValid(isValidHttpUrl(value));
        setImage(value);
        break;
    }
  }

  const handleSave = () => {
    if (!isNameValid || !isPriceValid || !isImageValid) {
      return;
    }

    const modalProduct: IProduct = {
      id: props.product?.id ?? 0,
      name: name,
      price: price,
      image: image
    }

    if (modalProduct.id) {
      props.updateProduct(modalProduct);
    } else {
      props.createProduct(modalProduct);
    }

    props.close()
  }

  return (
    <>
      <Modal onClose={() => props.close()} isOpen={props.isOpen}>
        <ModalHeader>{props.product && props.product?.id ? name : "New Product"}</ModalHeader>
        <ModalBody>
          <FormControl label="Name" error={shouldShowNameError ? 'Please input a valid Name' : null}>
            <Input name="name"
              autoFocus={true}
              onBlur={() => setNameIsVisited(true)}
              error={shouldShowNameError}
              overrides={shouldShowNameError ? { After: NegativeIcon } : {}}
              onChange={handleChange} value={name} />
          </FormControl>
          <FormControl label="Price" error={shouldShowPriceError ? 'Please input a valid Price' : null}>
            <Input name="price" type='number'
              onBlur={() => setPriceIsVisited(true)}
              error={shouldShowPriceError}
              overrides={shouldShowPriceError ? { After: NegativeIcon } : {}}
              onChange={handleChange} value={price} />
          </FormControl>
          <FormControl label="Image Url" error={shouldShowImageError ? 'Please input a valid Image Url' : null}>
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
          <ModalButton disabled={!isNameValid || !isPriceValid || !isImageValid} onClick={() => handleSave()}>Save</ModalButton>
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

function mapStateToProps(state: AppState, ownProps: any) {
  return {
    products: state.productState.products.length === 0 ? [] : state.productState.products
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    createProduct: bindActionCreators(ProductActions.createProduct, dispatch),
    updateProduct: bindActionCreators(ProductActions.updateProduct, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductEdit);

