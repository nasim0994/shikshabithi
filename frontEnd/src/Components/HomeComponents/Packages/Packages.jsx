import PackageCards from "../../PackageCards/PackageCards";

export default function Packages() {
  return (
    <section className="sm:pb-10">
      <div className="container">
        <h3 className="tetx-2xl sm:text-3xl font-semibold text-primary text-center italic section_line">
          OUR PACKAGES
        </h3>

        <div className="mt-4 sm:mt-6">
          <PackageCards />
        </div>
      </div>
    </section>
  );
}
