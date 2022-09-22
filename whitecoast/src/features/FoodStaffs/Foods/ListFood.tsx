import { SyntheticEvent, useState } from "react";
import { Segment, Item, Button, Modal } from "semantic-ui-react";
import { Food } from "../../../app/models/food";
import EditFood from "./EditFood";

interface Props {
  foods: Food[];
  selectedFood: Food | undefined;
  selectFood: (id: string) => void;
  cancelSelectFood: () => void;
  createOrEdit: (food: Food) => void;
  deleteFood: (id: string) => void;
  openEdit:boolean;
  editFood:()=>void;
  //submitting:boolean;
}

export default function ListFood({
  foods,
  selectFood,
  selectedFood,
  cancelSelectFood,
  createOrEdit,
  deleteFood,
  openEdit,
  editFood
}: //submitting
Props) {
  const [target, setTarget] = useState("");

  function handleFoodDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteFood(id);
  }
  return (
    <div>
      <Segment>
        <Item.Group divided>
          {foods.map((food) => (
            <Item key={food.id}>
              <Item.Content>
                <Item.Header as="a">
                  {food.name}
                </Item.Header>
                <Item.Meta>{food.size}</Item.Meta>
                <Item.Meta>{food.time}</Item.Meta>
                <Item.Meta>{food.cheff}</Item.Meta>
                <Item.Extra>
                  <Button
                    loading={target === food.id}
                    name={food.id}
                    onClick={(e) => handleFoodDelete(e, food.id)}
                    floated="right"
                    content="delete"
                    color="red"
                  />

                  <Modal
                    onOpen={editFood}
                    open={openEdit}
                    size="tiny"
                    trigger={
                      <Button
                        onClick={() => selectFood(food.id)}
                        floated="right"
                        content="edit"
                        color="blue"
                      />
                    }
                  >
                    <Modal.Header
                      style={{
                        width: "15rem",
                        position: "relative",
                        left: "12rem",
                      }}
                    >
                      Edit Food
                    </Modal.Header>
                    <EditFood
                      food={selectedFood}
                      createOrEdit={createOrEdit}
                      cancelSelectFood={cancelSelectFood}
                      editFood={editFood}
                    ></EditFood>
                  </Modal>
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </div>
  );
}
