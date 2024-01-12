import React, { useState } from "react"
import BlogItem from "partials/blocks/BlogItem"
import TaxonomyLinks from "partials/navigation/TaxonomyLinks"
import Pagination from "partials/navigation/Pagination"
import { paginate } from "@/utils/index"
import styles from "@/styles/components/articleAndServices.module.css";

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
          <TaxonomyLinks categories={categories} />
        </header>
      }
      <div className={styles.wrapper}>
        {paginatedPosts.map((item, i) => {
          return (
            <BlogItem
              key={i}
              image={item.attributes.image}
              title={item.attributes.title}
              description={item.attributes.description}
              slug={item.attributes.slug}
              author={item.attributes.author}
              category={item.attributes.category.data?.attributes}
              publishedAt={item.attributes.publishedAt}
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

