import React, { useEffect, useRef, useState } from "react";
import f3 from "family-chart";
import "family-chart/styles/family-chart.css";
import useFamilyTreeData from "../../hooks/useFamilyTreeData";
import PersonDialog from "../personDialogComponent/PersonDialog";
import SettingsDialog from "../settingDialogComponent/SettingsDialog";

const FamilyTree = ({ personId }) => {
  const cont = useRef(null);
  const { treeData, loading } = useFamilyTreeData(personId);

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
    cardDisplayLines: [
      "first_name,last_name,avatar,birth_date,death_date", // Line 1
      "status",                                            // Line 2
      ""                                                   // Line 3
    ],
  });

  useEffect(() => {
    if (loading || !cont.current || treeData.length === 0) return;

    const container = cont.current;
    container.innerHTML = "";

    const f3Chart = f3
      .createChart("#FamilyChart", treeData)
      .setTransitionTime(settings.transitionTime)
      .setCardXSpacing(settings.cardXSpacing)
      .setCardYSpacing(settings.cardYSpacing)
      .setSingleParentEmptyCard(settings.singleParentEmptyCard, {
        label: settings.emptyCardLabel,
      });


    if (settings.orientation === "vertical") {
      f3Chart.setOrientationVertical();
    } else {
      f3Chart.setOrientationHorizontal();
    }

    const f3Card = f3Chart.setCard(f3.CardHtml)
      .setCardDisplay(
        settings.cardDisplayLines.map(line => line.split(',').map(f => f.trim()).filter(Boolean))
      )
      .setMiniTree(settings.miniTree)
      .setStyle("imageRect")
      .setOnHoverPathToMain();

    const f3EditTree = f3Chart.editTree()
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
    f3Chart.updateTree({ initial: true });

  }, [treeData, loading, settings]);

  return (
    <>
      <div style={{ textAlign: "right", marginBottom: 10, marginRight: 20 }}>
        <button onClick={() => setShowSettings(true)}>⚙️ Settings</button>
      </div>
      <div className="f3 f3-cont" id="FamilyChart" ref={cont}></div>

      <PersonDialog personData={selectedPerson} onClose={() => setSelectedPerson(null)} />
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
