import { Footer } from "flowbite-react";

const DevFooter = () => {
  return (
    <Footer container={true} className="p-4 mt-auto">
      <Footer.Copyright href="#" by="DevJobs™" year={2022} />
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
};

export default DevFooter;
