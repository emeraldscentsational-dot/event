import { useState } from "react";
import { faq } from "./constants";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import Container from "components/Container";
import { useGetFaqsQuery } from "../../redux/api/faqsApiSlice";
import PageLoader from "components/PageLoader";

const { headRexr, subText } = faq;

const Faq = () => {
  const { data: faqs, isLoading, isError } = useGetFaqsQuery({});
  const [currentTab, setCurrentTab] = useState("");

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <div className="text-center">Something Happened</div>;
  }
  return (
    <Container>
      <div className="font-lato pt-10 pb-20 lg:pb-[227px]">
        <div className="flex flex-col gap-4 items-center justify-center">
          <h1 className="text-center text-[28px] md:text-[44px] font-[700] leading-[52px]">
            {headRexr}
          </h1>
          <p className="text-[16px] md:text-[20px] text-bodyLight text-center">
            {subText}
          </p>
        </div>
        <div className="w-full max-w-[800px] mx-auto  px-3 mt-10  md:mt-[80px]">
          <div className="faqs">
            {faqs?.value
              ? faqs.value.map((d: any, i: any) => (
                  <div
                    className="expandable"
                    key={d.question}
                    onClick={() => {
                      if (currentTab === d.question) {
                        return setCurrentTab("");
                      }
                      setCurrentTab(d.question);
                    }}
                  >
                    <div className="expandable-header">
                      <p className="w-full p-text-base md:text-[20px] font-[600] leading-[24px] text-mainLight">
                        {d.question}
                      </p>
                      {currentTab === d.question ? (
                        <IoMdClose size={24} />
                      ) : (
                        <IoMdAdd size={24} />
                      )}
                    </div>
                    <p
                      className={` ${
                        currentTab === d.question ? "expand" : ""
                      } expandable-body answer`}
                      dangerouslySetInnerHTML={{ __html: d.answer }}
                    ></p>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Faq;
