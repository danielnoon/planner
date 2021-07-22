import { FC } from "react";
import Requirement from "../types/Requirement";
import Card from "./primitives/Card";
import Center from "./primitives/Center";
import Grid from "./primitives/Grid";
import { Unordered } from "./primitives/List";
import ListItem from "./primitives/ListItem";
import Padding from "./primitives/Padding";

interface RequirementListProps {
  requirements: Requirement[];
  onEdit: (code: string) => void;
}

const RequirementList: FC<RequirementListProps> = ({ requirements }) => {
  // return <Card>
  //   <Unordered>
  //     {
  //       requirements.map(r =>
  //         <ListItem key={r.id}>
  //           <Grid templateColumns="1fr">
  //             <span>{r.name}</span>
  //           </Grid>
  //         </ListItem>
  //       )
  //     }
  //   </Unordered>
  // </Card>

  return (
    <Card>
      <Padding>
        <Center>
          <h3 style={{ textAlign: "center" }}>
            Requirements have not been implemented yet!
          </h3>
          <p
            style={{
              fontSize: 14,
              textAlign: "center",
              color: `rgba(0, 0, 0, 0.8)`,
            }}
          >
            For now, you can get started by adding your classes.
          </p>
        </Center>
      </Padding>
    </Card>
  );
};

export default RequirementList;
