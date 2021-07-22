import { FC, useState } from "react";
import { $classes, ClassSort } from "../state/classSelectors";
import useStore from "../state/store";
import Class from "../types/Class";
import AddButton from "./AddButton";
import ClassEditor from "./ClassEditor";
import Card from "./primitives/Card";
import Grid from "./primitives/Grid";
import GridItem from "./primitives/GridItem";
import { Unordered } from "./primitives/List";
import ListItem from "./primitives/ListItem";
import StatusChip from "./StatusChip";
import shallow from "zustand/shallow";
import Flex from "./primitives/Flex";
import SelectWrapper from "./primitives/SelectWrapper";
import Select from "react-select";
import StickyHeader from "./StickyHeader";
import Padding from "./primitives/Padding";

interface ClassListProps {}

const ClassList: FC<ClassListProps> = () => {
  const [sort, setSort] = useState(ClassSort.Term);

  const classes = useStore($classes({ sort }), shallow);
  const update = useStore((store) => store.editClass);
  const create = useStore((store) => store.addClass);

  const [editTarget, setEditTarget] = useState(Class.empty);
  const [updateType, setUpdateType] = useState<"update" | "create">("create");
  const [editorOpen, setEditorOpen] = useState(false);

  function onEdit(id: number) {
    const c = classes.find((c) => c.id === id);
    if (c) {
      setEditTarget(c);
      setUpdateType("update");
      setEditorOpen(true);
    }
  }

  function onCreate() {
    setEditTarget(Class.empty);
    setUpdateType("create");
    setEditorOpen(true);
  }

  function onEditSubmit(c: Class) {
    if (updateType === "create") {
      create(c);
    } else {
      update(c.id, c);
    }

    setEditorOpen(false);
    setEditTarget(Class.empty);
  }

  return (
    <Flex flood direction="column">
      <StickyHeader>
        <Padding>
          <Flex direction="row">
            <h2 style={{ flexGrow: 1 }}>Classes</h2>
            <SelectWrapper label="Sort By">
              <Select
                styles={{ container: (base) => ({ ...base, zIndex: 6 }) }}
                options={[
                  ClassSort.Credits,
                  ClassSort.Term,
                  ClassSort.Status,
                ].map((type) => ({
                  value: type,
                  label: type,
                }))}
                value={{ value: sort, label: sort }}
                onChange={(val) => setSort(val?.value ?? ClassSort.Term)}
              ></Select>
            </SelectWrapper>
          </Flex>
        </Padding>
      </StickyHeader>
      <Padding>
        <Card>
          <Unordered roundBottom>
            {classes.map((c) => (
              <ListItem key={c.id} onClick={() => onEdit(c.id)}>
                <Grid templateColumns="7em 2em 1fr 8em" items="center">
                  <GridItem>
                    <code>{c.code}</code>
                  </GridItem>
                  <GridItem>
                    <code>{c.credits}</code>
                  </GridItem>
                  <GridItem>{c.name}</GridItem>
                  <GridItem>
                    <StatusChip status={c.status} />
                  </GridItem>
                </Grid>
              </ListItem>
            ))}
          </Unordered>
          <AddButton onClick={onCreate}>+ Add</AddButton>
        </Card>
      </Padding>

      <ClassEditor
        c={editTarget}
        onCancel={() => setEditorOpen(false)}
        onSubmit={onEditSubmit}
        open={editorOpen}
      />
    </Flex>
  );
};

export default ClassList;

export const termMappings = {
  semester: (start: number) => [
    `Fall ${start}`,
    `Spring ${start + 1}`,
    `Summer ${start + 1}`,
    `Fall ${start + 1}`,
    `Spring ${start + 2}`,
    `Summer ${start + 2}`,
    `Fall ${start + 2}`,
    `Spring ${start + 3}`,
    `Summer ${start + 3}`,
    `Fall ${start + 3}`,
    `Spring ${start + 4}`,
  ],
};
