import { Card, Input } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useEffect } from "react";
import { LuinInquiryItem } from "./components/inquiry-item.component";
import { ReactComponent as Search } from "../../../../../assets/icons/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../states/rootReducer";
import { InquiriesResponse, Inquiry } from "../../../../models/Inquiry";
import { loadInquiries, setInquiriesSearch } from "../../../../states/inquiry";

export function LuinInquiries() {
  const dispatch = useDispatch();

  const inquiries: InquiriesResponse = useSelector(
    (state: RootState) => state.inquiry.inquiries || []
  );

  const isLoadingInquiries: boolean = useSelector(
    (state: RootState) => state.inquiry.isLoadingInquries || false
  );

  const searchKey: string = useSelector(
    (state: RootState) => state.inquiry.inquirySearch || ""
  );

  const handleSearchChange = (e: any) => {
    dispatch(setInquiriesSearch(e.target.value));
  };

  let allInquiries: Inquiry[] = inquiries.data;
  let displayedInquiries: Inquiry[] = inquiries.data;

  if (searchKey) {
    displayedInquiries = allInquiries.filter((inquiry) =>
      inquiry.name.toLowerCase().includes(searchKey.toLowerCase())
    );
  } else {
    displayedInquiries = allInquiries;
  }

  useEffect(() => {
    dispatch(loadInquiries());
  }, [dispatch]);
  return (
    <Card>
      <Title level={4} className="title">
        Inquiries
      </Title>
      <Input
        value={searchKey}
        onChange={handleSearchChange}
        prefix={<Search style={{ marginRight: "10px" }}></Search>}
        placeholder="Search name"
        style={{ marginBottom: "16px" }}
      ></Input>

      {!isLoadingInquiries && (
        <div className="inquiries-list-container">
          {displayedInquiries.map((inquiry: Inquiry, index: number) => (
            <LuinInquiryItem inquiry={inquiry} key={index}></LuinInquiryItem>
          ))}
        </div>
      )}
    </Card>
  );
}
