import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap'
import Layout from './Layout'
import state from '../state'

export default class SkillsShowPage extends Component {
  constructor(props){
    super(props)
    this.loadSkill(props.location.params.skillSlug)
  }

  componentWillReceiveProps(newProps){
    const params = this.props.location.params
    const newParams = newProps.location.params
    if (params.skillSlug !== newParams.skillSlug)
      this.loadSkill(newParams.skillSlug)
  }

  loadSkill(skillSlug){
    state.loadSkillBySlug(skillSlug)
  }

  render(){
    const { skillSlug } = this.props.location.params
    const { skills, skillIdsBySlug } = this.props.state
    const skillId = skillIdsBySlug[skillSlug]
    if (skillId === null) return <Layout>Skill Not Found</Layout>
    const skill = skillId && skills[skillId]
    if (!skill) return <Layout>Loading…</Layout>
    return <Layout>
      <h1>{skill.name}</h1>
      <div>{skill.tags.join(', ')}</div>
      <pre>{skill.description||''}</pre>
    </Layout>
  }
}
