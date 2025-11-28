import { Testimonial } from "interfaces/testimonialType";
import { RiDoubleQuotesL } from "react-icons/ri";

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="w-full max-w-[506px] min-h-[255px] p-8 flex flex-col gap-4 rounded-[10px] border border-[#D1D1D1] shadow-md">
      <RiDoubleQuotesL color="#005F61" size={23} />
      <p className="text-bodyLight leading-[24px]">{testimonial.text}</p>
      <div className="flex gap-3">
        <img
          className="h-[40px] w-[40px] rounded-full"
          src={`data:image/jpeg;base64,${testimonial.imageDetails.imageDataBase64}`}
          alt={testimonial.authorName}
        />
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold leading-[19px] text-[##1E1E1E]">
            {testimonial.authorName}
          </h1>

          <p className="text-xs leading-[14px] text-bodyLight">
            {testimonial.userType}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
