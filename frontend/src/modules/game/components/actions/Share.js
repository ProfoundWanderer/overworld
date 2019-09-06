import React from "react";
import { Grid, Icon, Popup, Form } from "semantic-ui-react";
import moment from "moment";
import {
  FacebookShareButton,
  TwitterShareButton
} from "react-share";
import "font-awesome/css/font-awesome.min.css";

class Share extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Grid className="action-buttons">
          <Grid.Row columns={3} verticalAlign="middle">
            <Grid.Column>
              <Form.Input type="text" placeholder="https://google.com/" readOnly />
            </Grid.Column>
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
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Share;
