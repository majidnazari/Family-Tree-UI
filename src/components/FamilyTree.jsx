import React from "react";
import f3 from 'family-chart';
import 'family-chart/styles/family-chart.css';

export default class FamilyTree extends React.Component {
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
      .setFields(["first name", "last name", "birthday", "avatar", "score"], ["memories"])
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
        "id": "0",
        "rels": {
          "spouses": ["7e30f553-bf36-4c29-ac71-1cbaeaa87edc"]
        },
        "data": {
          "first name": "Name",
          "last name": "Surname",
          "birthday": 1970,
          "avatar": "https://static8.depositphotos.com/1009634/988/v/950/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg",
          "gender": "M",
          "score": "4"
        }
      },
      {
        "id": "7e30f553-bf36-4c29-ac71-1cbaeaa87edc",
        "data": {
          "gender": "F",
          "first name": "s2",
          "last name": "ls2",
          "birthday": "1970",
          "score": "2",
          "avatar": ""
        },
        "rels": {
          "spouses": ["0"],
          "children": []
        }
      }
    ];
  }

  render() {
    return <div className="f3 f3-cont" id="FamilyChart" ref={this.cont}></div>;
  }
}
