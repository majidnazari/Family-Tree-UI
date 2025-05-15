import React from "react";
import f3 from 'family-chart';
import 'family-chart/styles/family-chart.css';

export default class FamilyTree2 extends React.Component {
  cont = React.createRef();

  componentDidMount() {
    const container = this.cont.current;

    if (!container) return;

    // ✅ Prevent duplicate init by clearing existing content
    container.innerHTML = '';

    const f3Chart = f3.createChart('#FamilyChart', this.data())
      .setTransitionTime(1000)
      .setCardXSpacing(250)
      .setCardYSpacing(150)
      .setOrientationVertical()
      .setSingleParentEmptyCard(true, { label: 'ADD' });

    const f3Card = f3Chart.setCard(f3.CardHtml)
      .setCardDisplay([
        ["first name", "last name"],
        ["birthday"],
        ["score"]
      ])
      .setCardDim({})
      .setMiniTree(true)
      .setStyle('imageRect')
      .setOnHoverPathToMain();

    const f3EditTree = f3Chart.editTree()
      .fixed(true)
      .setFields(["first name", "last name", "birthday", "avatar", "score"])
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
  }

  data() {
    return [
      {
        "id": "103",
        "data": { "first name": "آقا بابا", "last name": "پیرودین", "gender": "M" },
        "rels": { "spouses": ["104"], "children": ["101", "90", "13", "14", "91", "16"] }
      },
      {
        "id": "104",
        "data": { "first name": "سکینه", "last name": "پیرودین", "gender": "F" },
        "rels": { "spouses": ["103"], "children": ["101", "90", "13", "14", "91", "16"] }
      },
      {
        "id": "90",
        "data": { "first name": "جعفر", "last name": "پیرودین", "gender": "M" },
        "rels": { "father": "103", "mother": "104", "spouses": ["17"], "children": ["18"] }
      },
      {
        "id": "17",
        "data": { "first name": "صفا", "last name": "علیپور", "gender": "F" },
        "rels": { "spouses": ["90"], "children": ["18"] }
      },
      {
        "id": "18",
        "data": { "first name": "اعظم", "last name": "پیرودین", "gender": "F" },
        "rels": { "father": "90", "mother": "17", "spouses": ["38"], "children": ["28", "80", "81"] }
      },
      {
        "id": "38",
        "data": { "first name": "عبدالله", "last name": "پیرودین", "gender": "M" },
        "rels": { "spouses": ["18"], "children": ["28", "80", "81"] }
      },
      {
        "id": "28",
        "data": { "first name": "الهام", "last name": "پیرودین", "gender": "F" },
        "rels": { "father": "38", "mother": "18", "spouses": ["25"], "children": ["29", "96"] }
      },
      {
        "id": "25",
        "data": { "first name": "هادی", "last name": "محمدزاده", "gender": "M" },
        "rels": { "spouses": ["28"], "children": ["29", "96"] }
      },
      {
        "id": "29",
        "data": { "first name": "نیما", "last name": "محمدزاده", "gender": "M" },
        "rels": { "father": "25", "mother": "28" }
      },
      {
        "id": "96",
        "data": { "first name": "نوید", "last name": "محمدزاده", "gender": "M" },
        "rels": { "father": "25", "mother": "28" }
      },
      {
        "id": "80",
        "data": { "first name": "آزاده", "last name": "پیرودین", "gender": "F" },
        "rels": { "father": "38", "mother": "18", "spouses": ["85"], "children": ["86"] }
      },
      {
        "id": "85",
        "data": { "first name": "جواد", "last name": "حسینی", "gender": "M" },
        "rels": { "spouses": ["80"], "children": ["86"] }
      },
      {
        "id": "86",
        "data": { "first name": "امیرعلی", "last name": "حسینی", "gender": "M" },
        "rels": { "father": "85", "mother": "80" }
      },
      {
        "id": "81",
        "data": { "first name": "کاظم", "last name": "پیرودین", "gender": "M" },
        "rels": { "father": "38", "mother": "18", "spouses": ["87"], "children": ["88"] }
      },
      {
        "id": "87",
        "data": { "first name": "فاطمه", "last name": "شهیری", "gender": "F" },
        "rels": { "spouses": ["81"], "children": ["88"] }
      },
      {
        "id": "88",
        "data": { "first name": "مهدی یار", "last name": "پیرودین", "gender": "M" },
        "rels": { "father": "81", "mother": "87" }
      },
      {
        "id": "91",
        "data": { "first name": "منصوره", "last name": "پیرودین", "gender": "F" },
        "rels": { "father": "103", "mother": "104", "spouses": ["21"], "children": ["92", "25", "26", "27"] }
      },
      {
        "id": "21",
        "data": { "first name": "ولی", "last name": "محمدزاده", "gender": "M" },
        "rels": { "spouses": ["91"], "children": ["92", "25", "26", "27"] }
      },
      {
        "id": "92",
        "data": { "first name": "مهدی", "last name": "محمدزاده", "gender": "M" },
        "rels": { "father": "21", "mother": "91" }
      },
      {
        "id": "26",
        "data": { "first name": "مرضیه", "last name": "محمدزاده", "gender": "F" },
        "rels": { "father": "21", "mother": "91" }
      },
      {
        "id": "27",
        "data": { "first name": "راضیه", "last name": "محمدزاده", "gender": "F" },
        "rels": { "father": "21", "mother": "91" }
      },
      {
        "id": "13",
        "data": { "first name": "محسن", "last name": "پیرودین", "gender": "M" },
        "rels": { "father": "103", "mother": "104" }
      },
      {
        "id": "14",
        "data": { "first name": "غلامحسین", "last name": "پیرودین", "gender": "M" },
        "rels": { "father": "103", "mother": "104" }
      },
      {
        "id": "16",
        "data": { "first name": "محبوبه", "last name": "پیرودین", "gender": "F" },
        "rels": { "father": "103", "mother": "104" }
      },
      {
        "id": "101",
        "data": { "first name": "اکبر", "last name": "پیرودین", "gender": "M" },
        "rels": { "father": "103", "mother": "104", "spouses": ["102"], "children": ["1"] }
      },
      {
        "id": "102",
        "data": { "first name": "اقدس", "last name": "محمدزاده", "gender": "F" },
        "rels": { "spouses": ["101"], "children": ["1"] }
      },
      {
        "id": "1",
        "data": { "first name": "محمد", "last name": "پیرودین", "gender": "M" },
        "rels": { "father": "101", "mother": "102", "spouses": ["4"], "children": ["5", "6"] }
      },
      {
        "id": "4",
        "data": { "first name": "سارا", "last name": "شاطری", "gender": "F" },
        "rels": { "spouses": ["1"], "children": ["5", "6"] }
      },
      {
        "id": "5",
        "data": { "first name": "ملیکا", "last name": "پیرودین", "gender": "F" },
        "rels": { "father": "1", "mother": "4", "spouses": ["89"] }
      },
      {
        "id": "6",
        "data": { "first name": "مهدی", "last name": "پیرودین", "gender": "M" },
        "rels": { "father": "1", "mother": "4" }
      },
      {
        "id": "89",
        "data": { "first name": "آصف", "last name": "یونسی", "gender": "M" },
        "rels": { "spouses": ["5"] }
      }
    ]
    
    
  }

  render() {
    return <div className="f3 f3-cont" id="FamilyChart" ref={this.cont}></div>;
  }
}
