# =========================
#  IMPORT LIBRARIES
# =========================
import pandas as pd
import matplotlib.pyplot as plt

pd.set_option("display.float_format", "{:,.2f}".format)

# =========================
#  LOAD DATA
# =========================

super_store_df = pd.read_csv(
    "Data/Raw_Data/superstore.csv",
    encoding="latin1"
)

# =========================
#  DATA OVERVIEW (optional checks, commented out)
# =========================

# print(super_store_df.head())
# print(super_store_df.shape)
# print(super_store_df.info())
# print(super_store_df.isnull().sum())
# print("Duplicates:", super_store_df.duplicated().sum())

# The data is already cleaned


# =========================================================
# Q1. What is total sales?
# =========================================================

total_sales = super_store_df['Sales'].sum()
print(f"Q1. Total Sales: ${total_sales:,.2f}")


# =========================================================
# Q2. What is total profit?
# =========================================================

total_profit = super_store_df['Profit'].sum()
print(f"Q2. Total Profit: ${total_profit:,.2f}")


# =========================================================
# Q3. Which category generates the most sales?
# =========================================================

sales_by_category = super_store_df.groupby('Category')['Sales'].sum()
top_sales_category = sales_by_category.idxmax()
print(f"\nQ3. Category with Most Sales: ${top_sales_category} "
      f"(${sales_by_category.max():,.2f})")
print(f"$sales_by_category")


# =========================================================
# Q4. Which category generates the most profit?
# =========================================================

profit_by_category = super_store_df.groupby('Category')['Profit'].sum()
top_profit_category = profit_by_category.idxmax()
print(f"\nQ4. Category with Most Profit: {top_profit_category} "
      f"(${profit_by_category.max():,.2f})")
print(f"${profit_by_category}")


# =========================================================
# Q5. Which sub-category is the most profitable?
# =========================================================

profit_by_subcategory = (
    super_store_df.groupby("Sub-Category")["Profit"]
    .sum()
    .sort_values(ascending=False)
)
top_subcategory = profit_by_subcategory.idxmax()
print(f"\nQ5. Most Profitable Sub-Category: {top_subcategory} "
      f"(${profit_by_subcategory.max():,.2f})")
print(profit_by_subcategory)

# Chart: Profit by Sub-Category
plt.figure(figsize=(12, 6))
profit_by_subcategory.plot(kind="bar")
plt.title("Profit by Sub-Category")
plt.xlabel("Sub-Category")
plt.ylabel("Total Profit")
plt.xticks(rotation=45, ha="right")
plt.tight_layout()
# plt.savefig("Visuals/profit_by_subcategory.png")
plt.show()


# =========================================================
# Q6. Which products are generating losses?
# =========================================================

profit_by_products = super_store_df.groupby('Product Name')['Profit'].sum().sort_values()
losing_products = profit_by_products[profit_by_products < 0]
print(f"\nQ6. Loss-Generating Products (Total: {len(losing_products)}, top 10 shown):")
print(losing_products.head(10))


# =========================================================
# Q7. Which region performs best?
# =========================================================

sales_by_region = super_store_df.groupby('Region')['Sales'].sum().sort_values(ascending=False)
top_region = sales_by_region.idxmax()
print(f"\nQ7. Best Performing Region: {top_region} "
      f"(${sales_by_region.max():,.2f})")
print(sales_by_region)


# =========================================================
# Q8. Which states generate the highest sales?
# =========================================================

sales_by_state = super_store_df.groupby('State')['Sales'].sum().sort_values(ascending=False)
top_state = sales_by_state.idxmax()
print(f"\nQ8. State with Highest Sales: {top_state} "
      f"(${sales_by_state.max():,.2f})")
print(sales_by_state.head(10))


# =========================================================
# Q9. How do discounts affect profit?
# =========================================================

discount_profit = (
    super_store_df.groupby("Discount")["Profit"]
    .mean()
    .sort_index()
)
print("\nQ9. Average Profit by Discount Level:")
print(discount_profit)

correlation = super_store_df['Discount'].corr(super_store_df['Profit'])
print(f"Correlation between Discount and Profit: {correlation:.3f}")

# Chart: Average Profit by Discount
ax = discount_profit.plot(kind="bar")
ax.set_xticklabels([f"{x:.0%}" for x in discount_profit.index])
plt.title("Average Profit by Discount")
plt.xlabel("Discount")
plt.ylabel("Average Profit")
plt.tight_layout()
plt.show()


# =========================================================
# Q10. Which customer segment is most profitable?
# =========================================================

profit_by_customer_segment = super_store_df.groupby('Segment')['Profit'].sum().sort_values(ascending=False)
top_segment = profit_by_customer_segment.idxmax()
print(f"\nQ10. Most Profitable Segment: {top_segment} "
      f"(${profit_by_customer_segment.max():,.2f})")
print(profit_by_customer_segment)


# =========================================================
# Q11. How have sales changed over time?
# =========================================================

super_store_df["Order Date"] = pd.to_datetime(super_store_df["Order Date"])

monthly_sales = (
    super_store_df
    .groupby(super_store_df["Order Date"].dt.to_period("M"))["Sales"]
    .sum()
)
print("\nQ11. Monthly Sales Trend:")
print(monthly_sales)

monthly_sales.index = monthly_sales.index.to_timestamp()

plt.figure(figsize=(12, 6))
plt.plot(monthly_sales.index, monthly_sales.values)
plt.title("Monthly Sales Trend")
plt.xlabel("Date")
plt.ylabel("Sales")
plt.tight_layout()
plt.show()

yearly_sales = (
    super_store_df
    .groupby(super_store_df["Order Date"].dt.year)["Sales"]
    .sum()
)
print("\nYearly Sales:")
print(yearly_sales)

sales_growth = yearly_sales.pct_change() * 100
print("\nYear-over-Year Sales Growth (%):")
print(sales_growth)


# =========================================================
# Q12. Which shipping mode is used most?
# =========================================================

ship_mode = super_store_df['Ship Mode'].value_counts()
top_ship_mode = ship_mode.idxmax()
print(f"\nQ12. Most Used Shipping Mode: {top_ship_mode} "
      f"({ship_mode.max()} orders)")
print(ship_mode)


# =========================================================
# Q13. What are the company's biggest problem areas?
# =========================================================

print("\nQ13. Biggest Problem Areas:")

print("\nWorst Performing Sub-Categories (by Profit):")
worst_performing_subcategory = profit_by_subcategory[
    (profit_by_subcategory < 0)
] 

print("\nWorst Performing Regions (by Sales):")
print(sales_by_region.sort_values().head())

print("\nWorst Performing States (by Sales):")
print(sales_by_state.sort_values().head())


# =========================================================
# Q14. What business recommendations can we make?
# =========================================================

print("\nQ14. See README / report for full written recommendations "
      "based on the analysis above.")