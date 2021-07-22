import { FC } from "react";
import Requirement from "../types/Requirement";
import Card from "./primitives/Card";
import Grid from "./primitives/Grid";
import { Unordered } from "./primitives/List";
import ListItem from "./primitives/ListItem";

interface RequirementListProps {
  requirements: Requirement[];
  onEdit: (code: string) => void;
}

const RequirementList: FC<RequirementListProps> = ({ requirements }) => {
  return <Card>
    <Unordered>
      {
        requirements.map(r => 
          <ListItem key={r.id}>
            <Grid templateColumns="1fr">
              <span>{r.name}</span>
            </Grid>
          </ListItem>
        )
      }
    </Unordered>
  </Card>
}

export default RequirementList;
