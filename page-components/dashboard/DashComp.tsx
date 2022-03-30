import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Colors from "../../constants/Colors";
import { LOAD_CATALOG } from "../../graphql/queries/catalog.queries";
import { Alert } from "../../reusable-components/Alert";
import { LoadingSpinner } from "../../reusable-components/LoadingSpinner";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { authenticate, selectCustomer } from "../../redux/customer.reducer";
import { FIRE_BSFT_EVENT } from "../../graphql/mutations/catalog.mutations";
import { useRouter } from "next/router";

import HeadingComp from "./HeadingComp";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eee;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 2rem 0;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  flex-wrap: wrap;
  padding: 2rem 0;
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin: 2rem 0;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 10px #22222220;
`;
const ImgContainer = styled.div`
  & img {
    object-fit: cover;
    width: 100%;
    border-radius: 10px;
  }
`;

const HeadingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TextContent = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${(props) => props.color};
  margin-top: 1rem;
  & h2 {
    margin: 0.2rem 0;
  }
  & p {
    margin: 0.2rem 0;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.color};
  color: #fff;
  border: 0;
  transition: all 0.3s ease-in-out;
  padding: 0.5rem;
  font-weight: 700;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background-color: ${({ color = "#ffffff" }) =>
      color.length > 7 ? color?.substring(0, 7) : color};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const SubmitBtn = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #222;
  background-color: transparent;
  border-radius: 5px;
  color: #222;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.color};
    border: 1px solid ${(props) => props.color};
    color: #fff;
    box-shadow: 0 1px 10px #22222220;
  }
`;

type ItemType = {
  title: string;
  image: string;
  availability: string;
  category: string;
  price: string;
  webLink: string;
  bsft_id: string;
};

//TODO fetch user data from bsft
export const DashComp = () => {
  const [alert, setAlert] = useState<string>("");

  const { error, data, loading } = useQuery(LOAD_CATALOG);

  const [selectedProducts, selectProducts] = useState<Array<ItemType>>([]);

  const [done, submitPreference] = useState<boolean>(false);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleSelectProduct = (product: ItemType) => {
    if (
      selectedProducts.filter(
        (selected: ItemType) => selected.bsft_id === product.bsft_id
      ).length > 0
    ) {
      const filterOutProduct = [...selectedProducts].filter(
        (selected: ItemType) => selected.bsft_id !== product.bsft_id
      );
      selectProducts(filterOutProduct);
    } else {
      selectProducts([...selectedProducts, product]);
    }
  };

  const [sendLikeEvent, { loading: loadingEvent }] =
    useMutation(FIRE_BSFT_EVENT);

  const customerState = useAppSelector(selectCustomer);

  const [items, setItems] = useState<Array<ItemType>>([
    {
      title: "",
      image: "",
      availability: "",
      category: "",
      price: "",
      webLink: "",
      bsft_id: "",
    },
  ]);

  //once user has finished liking items, submit event
  useEffect(() => {
    if (done)
      sendLikeEvent({
        variables: {
          input: {
            event_type: "like_product",
            custom_field_key: "products_liked",
            custom_field_value: JSON.stringify([...selectedProducts]),
          },
        },
      });
  }, [done]);

  useEffect(() => {
    if (error) {
      setAlert(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setItems(data.getCatalog.catalog.items);
    }
  }, [data]);

  //redirect user on unauth
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("@auth_token")) {
        const token = window.localStorage.getItem("@auth_token") || "";
        if (token !== "") {
          dispatch(
            authenticate({
              token,
            })
          );
        }
      } else {
        router.push("/");
      }
    }
  }, [customerState.customer.isAuthenticated]);

  if (loading) {
    return (
      <Section>
        <Content>
          <LoadingSpinner />
          <h1>Loading content...</h1>
        </Content>
      </Section>
    );
  }

  return (
    <Section>
      {alert !== "" && (
        <Alert message={alert} status="danger" callback={() => setAlert("")} />
      )}
      <Content>
        <Column>
          <HeadingComp />
          <HeadingRow
            style={{
              borderBottom: "1px solid #22222220",
            }}
          >
            <h1>Select guitar preferences for next order</h1>
            {loadingEvent && !done ? (
              <Column>
                <p>Submitting...</p>
                <LoadingSpinner />
              </Column>
            ) : (
              <Column>
                {selectedProducts.length > 0 && (
                  <SubmitBtn
                    onClick={() => submitPreference(true)}
                    color={Colors.secondary}
                  >
                    Submit Preferences
                  </SubmitBtn>
                )}
              </Column>
            )}
          </HeadingRow>
          {done ? (
            <Row>
              <Column>
                <h1>
                  Order creation is under way, you should receive a notification
                  once it is ready!
                </h1>
              </Column>
            </Row>
          ) : (
            <ItemGrid>
              {items.length > 0 &&
                items.map((item, index: number) => {
                  return (
                    <CardItem
                      key={index}
                      item={item}
                      selectProduct={handleSelectProduct}
                    />
                  );
                })}
            </ItemGrid>
          )}
        </Column>
      </Content>
      {alert && (
        <Alert
          message={alert}
          status={"danger"}
          callback={() => setAlert("")}
        />
      )}
    </Section>
  );
};

const CardItem = ({
  item,
  selectProduct,
}: {
  item: ItemType;
  selectProduct: (item: ItemType) => void;
}) => {
  const [liked, toggleLike] = useState<boolean>(false);

  const handleActions = (bLiked: boolean) => {
    //toggle liked locally
    toggleLike(bLiked);
    //add or remove product in state
    selectProduct(item);
  };

  return (
    <Card>
      <ImgContainer>
        <img src={item.image} />
      </ImgContainer>
      <TextContent color={Colors.main + "20"}>
        <h2>{item.title}</h2>
        <p>Price: {item.price}</p>
        <ButtonGroup>
          <Button
            onClick={() => handleActions(!liked)}
            color={liked ? "#0582CA" : "#0582CA50"}
            style={{ marginRight: "1rem" }}
          >
            Like
            {!liked ? (
              <FcLikePlaceholder size={15} style={{ marginLeft: ".5rem" }} />
            ) : (
              <FcLike size={15} style={{ marginLeft: ".5rem" }} />
            )}
          </Button>
        </ButtonGroup>
      </TextContent>
    </Card>
  );
};
