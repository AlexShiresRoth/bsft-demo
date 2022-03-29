import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Colors from "../../constants/Colors";
import { LOAD_CATALOG } from "../../graphql/queries/catalog.queries";
import { Alert } from "../../reusable-components/Alert";
import { LoadingSpinner } from "../../reusable-components/LoadingSpinner";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { useAppSelector } from "../../hooks/reduxHook";
import { selectCustomer } from "../../redux/customer.reducer";
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
  overflow-x: auto;
  padding: 2rem 0;
`;

type ItemType = {
  title: string;
  image: string;
  availability: string;
  category: string;
  price: string;
  webLink: string;
  bsftId: string;
};

export const DashComp = () => {
  const [alert, setAlert] = useState<string>("");

  const { error, data, loading } = useQuery(LOAD_CATALOG);

  const customerState = useAppSelector(selectCustomer);

  const [items, setItems] = useState<Array<ItemType>>([
    {
      title: "",
      image: "",
      availability: "",
      category: "",
      price: "",
      webLink: "",
      bsftId: "",
    },
  ]);

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

  console.log("data", data);

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
          //TODO get data from bsft
          {/* <h2>Welcome, {customerState.customer.isAuthenticated}</h2> */}
          <h1>Select Guitar Preferences</h1>
          <Row>
            {items.length > 0 &&
              items.map((item, index: number) => {
                return <CardItem key={index} item={item} />;
              })}
          </Row>
        </Column>
      </Content>
    </Section>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
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

const CardItem = ({ item }: { item: ItemType }) => {
  console.log("item!", item);

  const [liked, toggleLike] = useState<boolean>(false);

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
            onClick={() => toggleLike(!liked)}
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
          <Button onClick={() => toggleLike(!liked)} color={Colors.main}>
            Find
          </Button>
        </ButtonGroup>
      </TextContent>
    </Card>
  );
};
