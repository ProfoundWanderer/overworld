import React from "react";
import { Grid, Icon, Popup } from "semantic-ui-react";
import moment from "moment";
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  EmailShareButton
} from "react-share";
import "font-awesome/css/font-awesome.min.css";

class Share extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Grid className="action-buttons">
          <Grid.Row columns={4} verticalAlign="middle">
            <Grid.Column>
              <FacebookShareButton url={window.location.href}>
                <Popup
                  trigger={<Icon link size="big" name="facebook f" />}
                  content={"Facebook"}
                  position="top center"
                  size="tiny"
                  inverted
                />
              </FacebookShareButton>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <TwitterShareButton
                title={`${this.props.game.name} (${moment(
                  this.props.game.first_release_date * 1000
                ).format("YYYY")}) on @JoinOverworld:`}
                url={window.location.href}
              >
                <Popup
                  trigger={<Icon link size="big" name="twitter" />}
                  content={"Twitter"}
                  position="top center"
                  size="tiny"
                  inverted
                />
              </TwitterShareButton>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <RedditShareButton url={window.location.href}>
                <Popup
                  trigger={<Icon link size="big" name="reddit alien" />}
                  content={"Reddit"}
                  position="top center"
                  size="tiny"
                  inverted
                />
              </RedditShareButton>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <EmailShareButton
                url={window.location.href}
                subject={`Check out ${this.props.game.name} (${moment(
                  this.props.game.first_release_date * 1000
                ).format("YYYY")}) on Overworld!`}
              >
                <Popup
                  trigger={<Icon link size="big" name="envelope" />}
                  content={"Email"}
                  position="top center"
                  size="tiny"
                  inverted
                />
              </EmailShareButton>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Share;
