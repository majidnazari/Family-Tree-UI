// components/FamilyTree.jsx
import React, { useEffect, useRef,useState } from "react";
import f3 from "family-chart";
import "family-chart/styles/family-chart.css";
import useFamilyTreeData from "../../hooks/useFamilyTreeData"; //  import the hook
import PersonDialog from "../personDialogComponent/PersonDialog";

const FamilyTree = ({ personId }) => {

  const cont = useRef(null);
  const { treeData, loading } = useFamilyTreeData(personId); //  use the hook
  const [selectedPerson, setSelectedPerson] = useState(null); // <-- state for dialog

  useEffect(() => {
    if (loading || !cont.current || treeData.length === 0) return;

    const container = cont.current;
    container.innerHTML = "";

    const f3Chart = f3
      .createChart("#FamilyChart", treeData)
      .setTransitionTime(1000)
      .setCardXSpacing(250)
      .setCardYSpacing(150)
      .setOrientationVertical()
      .setSingleParentEmptyCard(true, { label: "ADD" });
    //.setAncestryDepth(1)
    //.setProgenyDepth(5)
    //.setSortChildrenFunction((a, b) => a.data['first name'] === b.data['first name'] ? 0 : a.data['first name'] > b.data['first name'] ? 1 : -1);


    const f3Card = f3Chart.setCard(f3.CardHtml)
      .setCardDisplay([
        ["first_name", "last_name", "avatar", "birth_date", "death_date"],
        ["status"],
        []
      ])
      .setMiniTree(true)
      .setStyle("imageRect")
      .setOnHoverPathToMain();


    const f3EditTree = f3Chart.editTree()
      .fixed(true)
      .setFields(["first_name", "last_name", "gender", "id", "avatar", "birth_date", "death_date", "is_owner", "status"])
      .setEditFirst(true);

    f3EditTree.setEdit();

    f3Card.setOnCardClick((e, d) => {
      console.log("Clicked person data:", d);
      setSelectedPerson(d); // <-- open dialog with clicked person
      f3EditTree.open(d);
      if (f3EditTree.isAddingRelative()) return;
      f3Card.onCardClickDefault(e, d);
    });

    f3Chart.updateTree({ initial: true });
    f3EditTree.open(f3Chart.getMainDatum());

    f3Chart.updateTree({ initial: true });
  }, [treeData, loading]);


  //return <div className="f3 f3-cont" id="FamilyChart" ref={cont}></div>;

  return (
    <>
      <div className="f3 f3-cont" id="FamilyChart" ref={cont}></div>
      <PersonDialog personData={selectedPerson} onClose={() => setSelectedPerson(null)} />
    </>
  );
};

export default FamilyTree;
