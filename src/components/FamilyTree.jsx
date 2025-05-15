// components/FamilyTree.jsx
import React, { useEffect, useRef } from "react";
import f3 from "family-chart";
import "family-chart/styles/family-chart.css";
import useFamilyTreeData from "../hooks/useFamilyTreeData"; // ✅ import the hook

const FamilyTree = ({ personId }) => {
  
  const cont = useRef(null);
  const { treeData, loading } = useFamilyTreeData(personId); // ✅ use the hook

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

    const f3Card = f3Chart.setCard(f3.CardHtml)
      .setCardDisplay([
        ["first name", "last name"],
        [],
        []
      ])
      .setMiniTree(true)
      .setStyle("imageRect")
      .setOnHoverPathToMain();

    const f3EditTree = f3Chart.editTree()
      .fixed(true)
      .setFields(["first name", "last name", "gender"])
      .setEditFirst(true);

    f3EditTree.setEdit();

    f3Card.setOnCardClick((e, d) => {
      f3EditTree.open(d);
      if (f3EditTree.isAddingRelative()) return;
      f3Card.onCardClickDefault(e, d);
    });

    f3Chart.updateTree({ initial: true });
    f3EditTree.open(f3Chart.getMainDatum());
    f3Chart.updateTree({ initial: true });
  }, [treeData, loading]);

  return <div className="f3 f3-cont" id="FamilyChart" ref={cont}></div>;
};

export default FamilyTree;
