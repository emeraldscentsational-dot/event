import React from "react";
import styles from "./feat.module.css"; 
import { featured, featuredImagess } from "./constants";
import Container from "components/Container";
import { useGetfeaturdImageQuery } from "./../../redux/api/featurdImageApiSlice";
import PageLoader from "components/PageLoader";

const FeaturedImages = () => {
  const {
    data: featuredImages,
    isLoading,
    isError,
  } = useGetfeaturdImageQuery({});
  // Utility function to convert ISO string to local date
  const formatDate = (isoString: Date) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(); // Default locale (user's system settings)
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <div className="text-center">Something Happened </div>;
  }
  return (
    <div className="w-full bg-[#F4FFFF] py-10 md:py-[120px] ">
      <Container>
        <div className="flex flex-col w-full justify-center items-center gap-8 md:gap-[72px] ">
          <div className="w-full  flex flex-col gap-4 mx-auto ">
            <h1 className="text-[28px] md:text-[40px] leading-[52px] text-center font-[700] text-mainLight">
              {featured.headText}
            </h1>

            <h2 className="text-bodyLight text-[18px] md:text-[20px] leading-[24px] text-center">
              {featured.subText}
            </h2>
          </div>
          <div className={`${styles.gridContainer} sm:rounded-[3rem]`}>
            <div className="flex flex-col gap-2">
              <div
                className={`${styles.gridItem} ${
                  styles[featuredImages?.value[0]?.imageOwner.toLowerCase()]
                }`}
              >
                <img
                  src={`data:image/png;base64,${featuredImages?.value[0]?.imageDetails?.imageDataBase64}`}
                  alt={featuredImages?.value[0]?.imageOwner}
                  className={`${styles.image} sm:h-[292px] sm:w-[234px] w-full`}
                />
                <div className={styles.details}>
                  <img
                    src={featuredImagess[0].logo}
                    alt="logo"
                    className={styles.logo}
                  />
                  <div>
                    <h3 className={styles.eventName}>
                      {featuredImages?.value[0]?.imageOwner}
                    </h3>
                    <p className={styles.titleNDate}>
                      {formatDate(featuredImages?.value[0]?.createdOn)}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`${styles.gridItem} ${
                  styles[featuredImages?.value[5]?.imageOwner.toLowerCase()]
                }`}
              >
                <img
                  src={`data:image/png;base64,${featuredImages?.value[5]?.imageDetails?.imageDataBase64}`}
                  alt={featuredImages?.value[5]?.imageOwner}
                  className={`${styles.image} sm:h-[300px] sm:w-[234px] w-full`}
                />
                <div className={styles.details}>
                  <img
                    src={featuredImagess[5].logo}
                    alt="logo"
                    className={styles.logo}
                  />
                  <div>
                    <h3 className={styles.eventName}>
                      {featuredImages?.value[5]?.imageOwner}
                    </h3>
                    <p className={styles.titleNDate}>
                      {formatDate(featuredImages?.value[5]?.createdOn)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div
                className={`${styles.gridItem} ${
                  styles[featuredImages?.value[1]?.imageOwner.toLowerCase()]
                }`}
              >
                <img
                  src={`data:image/png;base64,${featuredImages?.value[1]?.imageDetails?.imageDataBase64}`}
                  alt={featuredImages?.value[1]?.imageOwner}
                  className={`${styles.image} sm:h-[381px] sm:w-[234px] w-full`}
                />
                <div className={styles.details}>
                  <img
                    src={featuredImagess[1].logo}
                    alt="logo"
                    className={styles.logo}
                  />
                  <div>
                    <h3 className={styles.eventName}>
                      {featuredImages?.value[1]?.imageOwner}
                    </h3>
                    <p className={styles.titleNDate}>
                      {formatDate(featuredImages?.value[1]?.createdOn)}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`${styles.gridItem} ${
                  styles[featuredImages?.value[6]?.imageOwner.toLowerCase()]
                }`}
              >
                <img
                  src={`data:image/png;base64,${featuredImages?.value[6]?.imageDetails?.imageDataBase64}`}
                  alt={featuredImages?.value[6]?.imageOwner}
                  className={`${styles.image} sm:h-[211px] sm:w-[232px] w-full`}
                />
                <div className={styles.details}>
                  <img
                    src={featuredImagess[6].logo}
                    alt="logo"
                    className={styles.logo}
                  />
                  <div>
                    <h3 className={styles.eventName}>
                      {featuredImages?.value[6]?.imageOwner}
                    </h3>
                    <p className={styles.titleNDate}>
                      {formatDate(featuredImages?.value[6]?.createdOn)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div
                className={`${styles.gridItem} ${
                  styles[featuredImages?.value[2]?.imageOwner.toLowerCase()]
                }`}
              >
                <img
                  src={`data:image/png;base64,${featuredImages?.value[2]?.imageDetails?.imageDataBase64}`}
                  alt={featuredImages?.value[2]?.imageOwner}
                  className={`${styles.image} sm:h-[260px] sm:w-[234px] w-full`}
                />
                <div className={styles.details}>
                  <img
                    src={featuredImagess[2].logo}
                    alt="logo"
                    className={styles.logo}
                  />
                  <div>
                    <h3 className={styles.eventName}>
                      {featuredImages?.value[2]?.imageOwner}
                    </h3>
                    <p className={styles.titleNDate}>
                      {formatDate(featuredImages?.value[2]?.createdOn)}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`${styles.gridItem} ${
                  styles[featuredImages?.value[7]?.imageOwner.toLowerCase()]
                }`}
              >
                <img
                  src={`data:image/png;base64,${featuredImages?.value[7]?.imageDetails?.imageDataBase64}`}
                  alt={featuredImages?.value[7]?.imageOwner}
                  className={`${styles.image} sm:h-[333px] sm:w-[234px] w-full`}
                />
                <div className={styles.details}>
                  <img
                    src={featuredImagess[7].logo}
                    alt="logo"
                    className={styles.logo}
                  />
                  <div>
                    <h3 className={styles.eventName}>
                      {featuredImages?.value[7]?.imageOwner}
                    </h3>
                    <p className={styles.titleNDate}>
                      {formatDate(featuredImages?.value[7]?.createdOn)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 w-[475px] ">
                <div
                  className={`${styles.gridItem} ${
                    styles[featuredImages?.value[3]?.imageOwner.toLowerCase()]
                  }`}
                >
                  <img
                    src={`data:image/png;base64,${featuredImages?.value[3]?.imageDetails?.imageDataBase64}`}
                    alt={featuredImages?.value[3]?.imageOwner}
                    className={`${styles.image} sm:h-[292px] sm:w-[274px] w-full`}
                  />
                  <div className={styles.details}>
                    <img
                      src={featuredImagess[3].logo}
                      alt="logo"
                      className={styles.logo}
                    />
                    <div>
                      <h3 className={styles.eventName}>
                        {featuredImages?.value[3]?.imageOwner}
                      </h3>
                      <p className={styles.titleNDate}>
                        {formatDate(featuredImages?.value[3]?.createdOn)}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.gridItem} ${
                    styles[featuredImages?.value[4]?.imageOwner.toLowerCase()]
                  }`}
                >
                  <img
                    src={`data:image/png;base64,${featuredImages?.value[4]?.imageDetails?.imageDataBase64}`}
                    alt={featuredImages?.value[4]?.imageOwner}
                    className={`${styles.image} sm:h-[292px] sm:w-[194px] w-full`}
                  />
                  <div className={styles.details}>
                    <img
                      src={featuredImagess[4].logo}
                      alt="logo"
                      className={styles.logo}
                    />
                    <div>
                      <h3 className={styles.eventName}>
                        {featuredImages?.value[4]?.imageOwner}
                      </h3>
                      <p className={styles.titleNDate}>
                        {formatDate(featuredImages?.value[4]?.createdOn)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`w-[475px] ${styles.gridItem} ${
                  styles[featuredImages?.value[8]?.imageOwner.toLowerCase()]
                }`}
              >
                <img
                  src={`data:image/png;base64,${featuredImages?.value[8]?.imageDetails?.imageDataBase64}`}
                  alt={featuredImages?.value[8]?.imageOwner}
                  className={`{${styles.image}  sm:h-[300px] sm:w-[475px] w-full`}
                />
                <div className={styles.details}>
                  <img
                    src={featuredImagess[8].logo}
                    alt="logo"
                    className={styles.logo}
                  />
                  <div>
                    <h3 className={styles.eventName}>
                      {featuredImages?.value[8]?.imageOwner}
                    </h3>
                    <p className={styles.titleNDate}>
                      {formatDate(featuredImages?.value[8]?.createdOn)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FeaturedImages;
