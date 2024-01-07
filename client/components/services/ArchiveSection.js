import React, { useState } from "react"
import ServicesItem from "@/partials/blocks/ServicesItem"
import TaxonomyLinks from "@/partials/navigation/TaxonomyLinks"
import Pagination from "@/partials/navigation/Pagination"
import { paginate } from "@/utils/index"
import styles from "@/styles/components/articleAndServices.module.scss";

export const ArchiveSection = ({ items, service_types }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 12

  const onPageChange = (page) => {
    setCurrentPage(page)
    const header = document.getElementById("blog-archive-header")
    if (header) {
      header.scrollIntoView({ behavior: "smooth" })
    }x
  }

  const paginatedPosts = paginate(items, currentPage, pageSize)

  return (
    <>
      {service_types && 
        <header className={styles.header}>
          <TaxonomyLinks service_types={service_types} />
        </header>
      }
      <div className={styles.wrapper}>
        {paginatedPosts.map((item, i) => {
          return (
            <ServicesItem
              key={i}
              image={item.attributes.image}
              title={item.attributes.title}
              price={item.attributes.price}
              currency={item.attributes.currency}
              serviceType={item.attributes.service_type.data?.attributes}
              slug={item.attributes.slug}
            />
          )
        })}
        <Pagination
          items={items.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
    </>
  )
}
