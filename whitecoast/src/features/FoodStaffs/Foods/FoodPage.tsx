import { useEffect, useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { Food } from "../../../app/models/food";
import Foods from "./Foods";
import CreateFood from "./CreateFood";
import { v4 as uuid } from "uuid";
import agent from "../../../app/api/agent";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function FoodPage() {
  const [openCreate, setOpenCreate] = useState(false);

  const [foods, setFoods] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | undefined>(
    undefined
  );
  const [openEdit, setOpenEdit] = useState(false);

  const [loading, setLoading] = useState(true);
  //const [submitting,setSubmitting]=useState(false);

  useEffect(() => {
    agent.Foods.list().then((response) => {
      let food: Food[] = [];
      response.forEach((food) => {
       // busline.startTime = busline.startTime.split("T")[0];
       // busline.endTime = busline.endTime.split("T")[0];
       foods.push(food);
      });
      setFoods(foods);
      setLoading(false);
    });
  }, []);

  function handleSelectFood(id: string) {
    setSelectedFood(foods.find((x) => x.id === id));
  }

  function handleCancelSelectFood() {
    setSelectedFood(undefined);
  }
  function handleCreateFoodClose() {
    setOpenCreate(false);
  }
  function handleEditFoodClose() {
    openEdit ? setOpenEdit(false):setOpenEdit(true);
  }
  function handleCreateOrEditFood(food: Food) {
    // setSubmitting(true);
    if (food.id) {
      agent.Foods.update(food).then(() => {
        setFoods([...foods.filter((x) => x.id !== food.id), food]);
        setSelectedFood(undefined);
        //  setSubmitting(false);
      });
    } else {
      food.id = uuid();
      agent.Foods.create(food).then(() => {
        setFoods([...foods, food]);
        setSelectedFood(food);
        // setSubmitting(false);
      });
    }
    food.id
      ? setFoods([...foods.filter((x) => x.id !== food.id), food])
      : setFoods([...foods, { ...food, id: uuid() }]);
    setOpenCreate(false);
    setOpenEdit(false);
    setSelectedFood(undefined);
  }
  function handleDeleteFood(id: string) {
    agent.Foods.delete(id).then(() => {
      setFoods([...foods.filter((x) => x.id !== id)]);
    });
  }

  if (loading) return <LoadingComponent content="Loading app" />;
  return (
    <div>
      <div style={{ marginLeft: "15rem", marginRight: "12rem" }}>
        <Foods
          foods={foods}
          selectedFood={selectedFood}
          selectFood={handleSelectFood}
          cancelSelectFood={handleCancelSelectFood}
          createOrEdit={handleCreateOrEditFood}
          deleteFood={handleDeleteFood}
          openEdit={openEdit}
          editFood={handleEditFoodClose}
          // submitting={submitting}
        ></Foods>
      </div>

      <Modal
        onOpen={() => setOpenCreate(true)}
        open={openCreate}
        size="tiny"
        trigger={
          <Button
            circular
            color="black"
            floated="right"
            fixed="right"
            style={{
              width: "80px",
              height: "38px",
              position: "relative",
              bottom: "33em",
              right: "24rem",
              fontSize: "10px",
            }}
            content="Add Food"
          ></Button>
        }
      >
        <Modal.Header
          style={{ width: "15rem", position: "relative", left: "12rem" }}
        >
          Create Food
        </Modal.Header>
        <CreateFood
          food={selectedFood}
          createOrEdit={handleCreateOrEditFood}
          closeFood={handleCreateFoodClose}
        ></CreateFood>
      </Modal>
    </div>
  );
}
