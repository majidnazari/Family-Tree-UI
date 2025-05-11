
import React from "react";
import f3 from 'family-chart';  // npm install family-chart@0.2.1 or yarn add family-chart@0.2.1
import 'family-chart/styles/family-chart.css';

export default class FamilyTree extends React.Component {
  cont = React.createRef();

  componentDidMount() {
    if (!this.cont.current) return;

    create(data())

    function create(data) {
      const f3Chart = f3.createChart('#FamilyChart', data)
        .setTransitionTime(1000)
        .setCardXSpacing(250)
        .setCardYSpacing(150)
        .setOrientationVertical()
        .setSingleParentEmptyCard(true, { label: 'ADD' })

      const f3Card = f3Chart.setCard(f3.CardHtml)
        .setCardDisplay([["first name", "last name"], ["birthday"]])
        .setCardDim({})
        .setMiniTree(true)
        .setStyle('imageRect')
        .setOnHoverPathToMain()


      const f3EditTree = f3Chart.editTree()
        .fixed(true)
        .setFields(["first name", "last name", "birthday", "avatar"])
        .setEditFirst(true)

      f3EditTree.setEdit()

      f3Card.setOnCardClick((e, d) => {
        f3EditTree.open(d)
        if (f3EditTree.isAddingRelative()) return
        f3Card.onCardClickDefault(e, d)
      })

      f3Chart.updateTree({ initial: true })
      f3EditTree.open(f3Chart.getMainDatum())

      f3Chart.updateTree({ initial: true })
    }

    function data() {
      return [
        {
          "id": "0",
          "rels": {
            "spouses": [
              "1",
              "2"
            ],
            "children": [
              "3",
              "4",
              "5",
              "6"
            ],
            "father": "7",
            "mother": "8"
          },
          "data": {
            "first name": "majid",
            "last name": "nazari",
            "birthday": "1970",
            "avatar": "https://static8.depositphotos.com/1009634/988/v/950/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg",
            "gender": "M"
          }
        },
        {
          "id": "1",
          "data": {
            "gender": "F",
            "first name": "spouse 1",
            "last name": "ls1",
            "birthday": "1970",
            "avatar": ""
          },
          "rels": {
            "spouses": [
              "0"
            ],
            "children": [
              "3",
              "4"
            ]
          }
        },
        {
          "id": "2",
          "data": {
            "gender": "F",
            "first name": "spouse 2",
            "last name": "ls2",
            "birthday": "2001",
            "avatar": ""
          },
          "rels": {
            "spouses": [
              "0"
            ],
            "children": [
              "5",
              "6"
            ]
          }
        },
        {
          "id": "3",
          "data": {
            "gender": "M",
            "first name": "son 1",
            "last name": "ls1",
            "birthday": "2010",
            "avatar": ""
          },
          "rels": {
            "father": "0",
            "mother": "1"
          }
        },
        {
          "id": "4",
          "data": {
            "gender": "F",
            "first name": "d1",
            "last name": "ld1",
            "birthday": "2011",
            "avatar": ""
          },
          "rels": {
            "father": "0",
            "mother": "1"
          }
        },
        {
          "id": "5",
          "data": {
            "gender": "M",
            "first name": "s3",
            "last name": "ls3",
            "birthday": "2012",
            "avatar": ""
          },
          "rels": {
            "father": "0",
            "mother": "2"
          }
        },
        {
          "id": "6",
          "data": {
            "gender": "F",
            "first name": "d4",
            "last name": "ld4",
            "birthday": "2012",
            "avatar": ""
          },
          "rels": {
            "father": "0",
            "mother": "2"
          }
        },
        {
          "id": "7",
          "data": {
            "gender": "M",
            "first name": "f1",
            "last name": "lf1",
            "birthday": "1990",
            "avatar": ""
          },
          "rels": {
            "children": [
              "0"
            ],
            "spouses": [
              "8"
            ]
          }
        },
        {
          "id": "8",
          "data": {
            "gender": "F",
            "first name": "m1",
            "last name": "lm1",
            "birthday": "1992",
            "avatar": ""
          },
          "rels": {
            "children": [
              "0"
            ],
            "spouses": [
              "7"
            ]
          }
        }
      ]
    }

  }

  render() {
    return <div className="f3 f3-cont" id="FamilyChart" ref={this.cont}></div>;
  }
}
