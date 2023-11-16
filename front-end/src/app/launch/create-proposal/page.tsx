"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@/components/common/Button";
import { Input, InputNumber, Radio, DatePicker } from "antd";
const index = () => {
  const { TextArea } = Input;

  interface FormMessage {
    description: string;
    title: string;
    priceperNFT: number;
    funding_goal: number;
    proposal_type: string;
    date: string;
  }
  const initialValues: FormMessage = {
    title: "hello",
    description: "fine",
    priceperNFT: 0.1,
    funding_goal: 500,
    proposal_type: "holder",
    date: ``,
  };
  return (
    <div className="flex justify-center">
      <div className="text-sm mt-8  py-8 px-8 max-w-lg rounded-md border mb-6 ">
        <div className="flex justify-center">
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              // setProposal(values);
              console.log({ values, actions });
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                <div className="text-center text-2xl mb-1  font-semibold">
                  Submit Proposal
                </div>
                <div className="text-center mb-6 italic">
                  Submit your project proposals and ideas for community votes
                  and crowdfunding
                </div>
                <div className="flex flex-col gap-6">
                  {/* ------------------------  */}
                  <div>
                    <label className="font-medium" htmlFor="title">
                      Proposal Title
                    </label>
                    <div className="mt-2">
                      <Field
                        required
                        type="text"
                        id="title"
                        name="title"
                        as={Input}
                      />
                    </div>
                  </div>
                  {/* -------------  */}

                  {/* ------------------------  */}
                  <div>
                    <label className="font-medium" htmlFor="description">
                      Description
                    </label>
                    <div className=" mt-2">
                      <Field
                        required
                        as={TextArea}
                        id="description"
                        name="description"
                      />
                    </div>
                  </div>

                  {/* -------------  */}
                  <div className="flex items-center gap-8">
                    {/* ------------------------  */}
                    <div>
                      <label className="font-medium" htmlFor="priceperNFT">
                        Price per NFT
                      </label>
                      <div className="mt-2">
                        <Field
                          required
                          id="priceperNFT"
                          name="priceperNFT"
                          as={InputNumber}
                        />
                      </div>
                    </div>

                    {/* -------------  */}

                    {/* ------------------------  */}
                    <div>
                      <label className="font-medium" htmlFor="funding_goal">
                        Funding Goal
                      </label>
                      <div className="mt-2">
                        <Field
                          required
                          id="funding_goal"
                          name="funding_goal"
                          as={InputNumber}
                        />
                      </div>
                    </div>

                    {/* -------------  */}
                  </div>
                  {/* ------------ */}
                  <Radio.Group
                    onChange={(e) => {
                      setFieldValue("proposal_type", e.target.value);
                    }}
                    value={values.proposal_type}
                  >
                    <Radio value={"collab"} className="!font-raleway">
                      {" "}
                      DreamStarter Collab
                    </Radio>
                    <Radio value={"holder"} className="!font-raleway">
                      {" "}
                      DreamStarter Holder
                    </Radio>
                  </Radio.Group>

                  {/* ----------  */}

                  {/* ----------------------  */}
                  <div>
                    <div>
                      <label htmlFor="date" className="block mb-2">
                        Valid till
                      </label>

                      <DatePicker
                        onChange={(e) => {
                          setFieldValue("date", e);
                        }}
                      />
                    </div>
                  </div>

                  {/* ---------------------- */}
                </div>

                <div className="flex justify-center mt-5">
                  <Button
                    className="flex justify-center"
                    variant="primary"
                    size="md"
                    type="submit"
                    _isSubmitting={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Create Proposal
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default index;
