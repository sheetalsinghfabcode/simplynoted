import {Button} from './Button';
// import {FeaturedSection} from './FeaturedSection';
import {PageHeader, Text} from './Text';

export function NotFound({type = 'page'}) {
  const heading = `THAT PAGE CAN’T BE FOUND.`;
  const description = "It looks like nothing was found at this location.";

  return (
    <div>
      <div className='text-center grid justify-center sm:mt-14 mt-20 gap-[2px] '>
      <PageHeader heading={heading} className="text-[#191919] sm:text-[34px] text-[22px] sm:font-medium font-normal leading-[44px] sm:tracking-wide" />
        <Text width="full" as="p" className="text-[15px] font-light">
          {description}
        </Text>
        <Button width="auto" variant="secondary" to={'/'} className="bg-[#2879FE] text-white text-[14px] py-[8px] w-[30%] mx-auto font-medium mt-6 hover:bg-[#1b5299] hover:text-white cursor-pointer " >
          GO TO HOME
        </Button>
        </div>
      {/* <FeaturedSection /> */}
    </div>
  );
}
