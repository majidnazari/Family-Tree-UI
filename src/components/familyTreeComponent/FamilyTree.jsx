// FamilyTree.tsx
import React, { useEffect, useRef, useState } from "react";
import f3 from "family-chart";
import "family-chart/styles/family-chart.css";
import useFamilyTreeData from "../../hooks/useFamilyTreeData";
import PersonDialog from "../personDialogComponent/PersonDialog";
import SettingsDialog from "../settingDialogComponent/SettingsDialog";

const FamilyTree = ({ personId }) => {
  const containerRef = useRef(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  const [settings, setSettings] = useState({
    orientation: "vertical",
    cardXSpacing: 250,
    cardYSpacing: 150,
    transitionTime: 1000,
    miniTree: true,
    singleParentEmptyCard: true,
    emptyCardLabel: "ADD",
    enableEditMode: true,
    personId: personId || "1",
    maxLevel: 2,
    cardStyle: "imageRect",
    cardWidth: "",
    cardHeight: "",
    imageWidth: "",
    imageHeight: "",
    imageX: "",
    imageY: "",
    cardDisplayLines: [
      "first_name,last_name,avatar,birth_date,death_date",
      "status",
      ""
    ],
  });

  const { treeData, loading } = useFamilyTreeData(settings.personId, settings.maxLevel);

  useEffect(() => {
    if (loading || !containerRef.current || treeData.length === 0) return;

    const container = containerRef.current;
    container.innerHTML = "";

    const f3Chart = f3
      .createChart(container, treeData)
      .setTransitionTime(settings.transitionTime)
      .setCardXSpacing(settings.cardXSpacing)
      .setCardYSpacing(settings.cardYSpacing)
      .setSingleParentEmptyCard(settings.singleParentEmptyCard, {
        label: settings.emptyCardLabel,
      });

    settings.orientation === "vertical"
      ? f3Chart.setOrientationVertical()
      : f3Chart.setOrientationHorizontal();

    const f3Card = f3Chart
      .setCard(f3.CardHtml)
      .setCardDisplay(
        settings.cardDisplayLines.map(line =>
          line.split(",").map(f => f.trim()).filter(Boolean)
        )
      )
      .setMiniTree(settings.miniTree)
      .setStyle(settings.cardStyle)
      .setOnHoverPathToMain();

    const dimOptions = {};
    if (settings.cardWidth) dimOptions.width = +settings.cardWidth;
    if (settings.cardHeight) dimOptions.height = +settings.cardHeight;
    if (settings.imageWidth) dimOptions.img_width = +settings.imageWidth;
    if (settings.imageHeight) dimOptions.img_height = +settings.imageHeight;
    if (settings.imageX) dimOptions.img_x = +settings.imageX;
    if (settings.imageY) dimOptions.img_y = +settings.imageY;

    if (Object.keys(dimOptions).length > 0) {
      f3Card.setCardDim(dimOptions);
    }

    if (settings.enableEditMode) {
      const f3EditTree = f3Chart
        .editTree()
        .fixed(true)
        .setFields([
          "first_name", "last_name", "gender", "id",
          "avatar", "birth_date", "death_date", "is_owner", "status"
        ])
        .setEditFirst(true);

      f3EditTree.setEdit();

      f3Card.setOnCardClick((e, d) => {
        setSelectedPerson(d);
        f3EditTree.open(d);
        if (f3EditTree.isAddingRelative()) return;
        f3Card.onCardClickDefault(e, d);
      });

      f3Chart.updateTree({ initial: true });
      f3EditTree.open(f3Chart.getMainDatum());
    } else {
      f3Card.setOnCardClick((e, d) => {
        f3Card.onCardClickDefault(e, d);
      });
      f3Chart.updateTree({ initial: true });
    }
  }, [treeData, loading, settings]);

  return (
    <>
      <div style={{ textAlign: "right", marginBottom: 10, marginRight: 20 }}>
        <button onClick={() => setShowSettings(true)}>⚙️ Settings</button>
      </div>

      <div className="f3 f3-cont" id="FamilyChart" ref={containerRef}></div>

      <PersonDialog
        personData={selectedPerson}
        onClose={() => setSelectedPerson(null)}
      />

      <SettingsDialog
        open={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onChange={setSettings}
      />
    </>
  );
};

export default FamilyTree;
