import { Component } from '@angular/core'
import { findIndex, forOwn, isEqual, uniqWith } from 'lodash'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  private BOYS_NAMES = ['Hue', 'Daniel', 'Jordan', 'Asa', 'David', 'John', 'Jesse', 'Abraham', 'Noah', 'Liam', 'Elijah', 'Jonah']
  private GIRLS_NAMES = ['Sian', 'Winnie', 'Keziah', 'Mary', 'Jemimah', 'Keren', 'Sarah', 'Olivia']

  private HOMES = {
    flats: 12,
    cottages: 5,
    mansion: 3
  }

  private AGES = {
    young: 6,
    middle: 8,
    old: 6
  }

  private GENDERS = {
    male: this.BOYS_NAMES.length,
    female: this.GIRLS_NAMES.length
  }

  private EYES = {
    brown: 10,
    blue: 6,
    green: 4
  }

  private HEIGHTS = {
    small: 5,
    medium: 9,
    tall: 6
  }

  private HOMES_ARR
  private AGES_ARR
  private GENDERS_ARR
  private EYES_ARR
  private HEIGHTS_ARR

  private PEOPLE_COUNT = this.BOYS_NAMES.length + this.GIRLS_NAMES.length

  people

  constructor() {
    let uniquePeople
    do {
      this.populatePeople()
      uniquePeople = uniqWith(this.people, isEqual)
      console.log(this.people.length, uniquePeople.length)
    } while (uniquePeople.length !== this.people.length)
    this.populateNames()
  }

  private populateNames() {
    this.people = this.people.map(person => {
      if (person.gender === 'male') {
        const boysIdx = Math.floor(Math.random() * this.BOYS_NAMES.length)
        person.name = this.BOYS_NAMES[boysIdx]
        this.BOYS_NAMES.splice(boysIdx, 1)
      }
      if (person.gender === 'female') {
        const girlsIdx = Math.floor(Math.random() * this.GIRLS_NAMES.length)
        person.name = this.GIRLS_NAMES[girlsIdx]
        this.GIRLS_NAMES.splice(girlsIdx, 1)
      }
      return person
    })

    if (this.BOYS_NAMES.length !== 0) throw Error('oops boys')
    if (this.GIRLS_NAMES.length !== 0) throw Error('oops girls')

    const hueIndex = findIndex(this.people, {name: 'Hue'})
    this.people.splice(0, 0, this.people.splice(hueIndex, 1)[0])
  }

  private populatePeople() {

    this.people = []
    this.HOMES_ARR = []
    this.AGES_ARR = []
    this.GENDERS_ARR = []
    this.EYES_ARR = []
    this.HEIGHTS_ARR = []

    forOwn(this.HOMES, (v, k) => {
      for (let i = 0; i < v; i++) { this.HOMES_ARR.push(k) }
    })
    forOwn(this.AGES, (v, k) => {
      for (let i = 0; i < v; i++) { this.AGES_ARR.push(k) }
    })
    forOwn(this.GENDERS, (v, k) => {
      for (let i = 0; i < v; i++) { this.GENDERS_ARR.push(k) }
    })
    forOwn(this.EYES, (v, k) => {
      for (let i = 0; i < v; i++) { this.EYES_ARR.push(k) }
    })
    forOwn(this.HEIGHTS, (v, k) => {
      for (let i = 0; i < v; i++) { this.HEIGHTS_ARR.push(k) }
    })

    if (this.HOMES_ARR.length !== this.PEOPLE_COUNT) throw Error('oops homes')
    if (this.AGES_ARR.length !== this.PEOPLE_COUNT) throw Error('oops ages')
    if (this.GENDERS_ARR.length !== this.PEOPLE_COUNT) throw Error('oops genders')
    if (this.EYES_ARR.length !== this.PEOPLE_COUNT) throw Error('oops eyes')
    if (this.HEIGHTS_ARR.length !== this.PEOPLE_COUNT) throw Error('oops heights')

    while (this.people.length < this.PEOPLE_COUNT) {

      const homesIdx = Math.floor(Math.random() * this.HOMES_ARR.length)
      const agesIdx = Math.floor(Math.random() * this.AGES_ARR.length)
      const gendersIdx = Math.floor(Math.random() * this.GENDERS_ARR.length)
      const eyesIdx = Math.floor(Math.random() * this.EYES_ARR.length)
      const heightsIdx = Math.floor(Math.random() * this.HEIGHTS_ARR.length)

      const person = {
        home: this.HOMES_ARR[homesIdx],
        age: this.AGES_ARR[agesIdx],
        gender: this.GENDERS_ARR[gendersIdx],
        eyes: this.EYES_ARR[eyesIdx],
        height: this.HEIGHTS_ARR[heightsIdx]
      }

      this.HOMES_ARR.splice(homesIdx, 1)
      this.AGES_ARR.splice(agesIdx, 1)
      this.GENDERS_ARR.splice(gendersIdx, 1)
      this.EYES_ARR.splice(eyesIdx, 1)
      this.HEIGHTS_ARR.splice(heightsIdx, 1)

      this.people.push(person)
    }

    forOwn(this.HOMES, (v, k) => {
      const persons = this.people.filter((person) => person.home === k)
      if (persons.length !== v) throw Error('oops homes count')
    })
    forOwn(this.AGES, (v, k) => {
      const persons = this.people.filter((person) => person.age === k)
      if (persons.length !== v) throw Error('oops ages count')
    })
    forOwn(this.GENDERS, (v, k) => {
      const persons = this.people.filter((person) => person.gender === k)
      if (persons.length !== v) throw Error('oops genders count')
    })
    forOwn(this.EYES, (v, k) => {
      const persons = this.people.filter((person) => person.eyes === k)
      if (persons.length !== v) throw Error('oops eyes count')
    })
    forOwn(this.HEIGHTS, (v, k) => {
      const persons = this.people.filter((person) => person.height === k)
      if (persons.length !== v) throw Error('oops heights count')
    })
  }
}
