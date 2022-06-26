import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Box,
  Text,
} from "@chakra-ui/react";
import { useShoppingCart } from "use-shopping-cart";
import { fetchPostJSON } from "../utils/api-helpers";
import getStripe from "../utils/get-stripejs";

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
  } = useShoppingCart();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  console.log({ cartDetails });
  const line_items = Object.keys(cartDetails).map((key, val) => {
    const product = cartDetails[key];
    return { price: product.id, quantity: product.quantity };
  });

  const handleCheckout = async () => {
    const response = await fetchPostJSON("/api/checkout_sessions/cart", {
      line_items,
    });

    if (response.statusCode > 399) {
      console.error(response.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: response.id,
    });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button>My cart</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>My cart</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Button
              colorScheme="brand"
              onClick={() => {
                handleCheckout();
              }}
              disabled={cartEmpty || loading}
            >
              Checkout
            </Button>

            <Box my={2}>
              {line_items.map((item: any) => {
                return (
                  <Text>
                    {item.price} x {item.quantity}
                  </Text>
                );
              })}
            </Box>
          </PopoverBody>
          <PopoverFooter>
            <Text>
              {cartCount} items | {formattedTotalPrice}
            </Text>

            <Button
              colorScheme="brand"
              variant="link"
              size="sm"
              onClick={() => {
                clearCart();
              }}
            >
              Clear Cart
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default Cart;
