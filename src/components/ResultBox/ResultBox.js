import React, { Component } from 'react';
import './ResultBox.css';

class ResultBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      techStack: '',
      expertLanguages: '',
      githubActivity: '',
      expertise: '',
      yearsActive: '',
    };
  }

  componentDidMount() {
    this.parseResponseMessage();
  }

  componentDidUpdate(prevProps) {
    if (this.props.responseMessage !== prevProps.responseMessage) {
      this.parseResponseMessage();
    }
  }

  makeProfileLink() {
    const { username } = this.props;
    return `https://github.com/${username}`;
  }

  parseResponseMessage() {
    const { responseMessage } = this.props;

    if (responseMessage) {
      const { stack, languages, contributions, expertise, years_active } = JSON.parse(responseMessage);
      const languagesString = Object.values(languages).join(', '); // handle for not enough languages to analyze

      this.setState({
        techStack: stack || '',
        expertLanguages: languagesString || '',
        githubActivity: contributions || '',
        expertise: expertise || '',
        yearsActive: years_active || '',
      });

      this.profileLink = this.makeProfileLink();
    }
  }

  render() {
    const { techStack, expertLanguages, githubActivity, expertise, yearsActive } = this.state;

    return (
      <div className="result-box">
        <p className="result-text"> Tech Stack : {techStack}</p>
        <p className="result-text"> Expert Languages : {expertLanguages}</p>
        <p className="result-text"> GitHub Activity : {githubActivity}</p>
        <p className="result-text"> Expertise : {expertise}</p>
        <p className="result-text"> Years Active : {yearsActive}</p>
        <p className="result-link"> GitHub Profile Link :
          <a href={this.profileLink}> {this.profileLink} </a>
        </p>
      </div>
    );
  }
}

export default ResultBox;
