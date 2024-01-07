import React, { useState } from "react"
import ServicesItem from "@/partials/blocks/ServicesItem"
import CategoryLinks from "@/partials/navigation/CategoryLinks"
import Pagination from "@/partials/navigation/Pagination"
import { paginate } from "@/utils/index"
import styles from "@/styles/components/articleAndServices.module.scss";

export const ArchiveSection = ({ items, categories }) => {
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
      {categories && 
        <header className={styles.header}>
          <CategoryLinks categories={categories} />
        </header>
      }
      <div className={styles.wrapper}>
        {paginatedPosts.map((item, i) => {
          return (
            <ServicesItem
              key={i}
              image={item.attributes.image}
              title={item.attributes.title}
              description={item.attributes.description}
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
