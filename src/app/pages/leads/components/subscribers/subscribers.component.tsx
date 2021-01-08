import { Button, Card, Col, Input, Row } from "antd";
import Title from "antd/lib/typography/Title";
import React, { createRef } from "react";
import { LuinSubscriberLegends } from "./components/legends.component";
import { LuinSubscriberItem } from "../subscriber-item/subscriber-item.component";
import { ReactComponent as Search } from "../../../../../assets/icons/search.svg";
import { ReactComponent as Filter } from "../../../../../assets/icons/filters.svg";
import styles from "./subscribers.module.scss";
import { LuinSubscriber } from "../../../../api/subscriber.api";
import { LuinCreateSubscriberModal } from "../../../../components/modals/create-subscriber.modal";

export class LuinSubscribers extends React.Component {
  state: any;

  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false,
      subscribers: [],
    };
  }

  componentDidMount() {
    this.getSubscribers();
  }

  handleCreateSuccess = (data: any) => {
    this.getSubscribers();
  };

  getSubscribers() {
    new LuinSubscriber().getSubscribers().then((result) => {
      this.setState({
        subscribers: result.data,
      });
    });
  }

  render() {
    const subscriberModalRef = createRef<LuinCreateSubscriberModal>();
    return (
      <Card>
        <Title level={4} className="title">
          Subscribers
        </Title>
        {/* <Input prefix={<Search style={{marginRight: '10px'}}></Search>}  placeholder="Search email" style={{marginBottom: '16px'}}></Input> */}
        <div className={styles.filtersContainer}>
          <div>
            <Input
              className={styles.input}
              prefix={<Search style={{ marginRight: "10px" }}></Search>}
              placeholder="Search email"
            ></Input>
            <Filter className={styles.svg}></Filter>
          </div>

          <div>
            <LuinCreateSubscriberModal
              ref={subscriberModalRef}
              onCreateSuccess={this.handleCreateSuccess}
            ></LuinCreateSubscriberModal>
            <Button onClick={() => subscriberModalRef.current?.showModal()}>
              Add Subscriber
            </Button>
          </div>
        </div>
        <LuinSubscriberLegends></LuinSubscriberLegends>
        {!this.state.isLoading && (
          <div className="subscribers-list-container">
            <Row>
              {this.state.subscribers.map((item: any) => {
                return (
                  <Col
                    key={item.subscriptionId}
                    span={12}
                    className="subscriber-col"
                  >
                    <LuinSubscriberItem
                      subscriptionEmail={item.subscriptionEmail}
                    ></LuinSubscriberItem>
                  </Col>
                );
              })}
            </Row>
          </div>
        )}
      </Card>
    );
  }
}
