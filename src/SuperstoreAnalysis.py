# =========================
#  IMPORT LIBRARIES
# =========================
import pandas as pd
import matplotlib.pyplot as plt

# =========================
#  LOAD DATA
# =========================

super_store_df = pd.read_csv(
    "Data/Raw_Data/superstore.csv",
    encoding="latin1"
)

# #=========================
# #  DATA OVERVIEW
# # =========================


print(super_store_df.head())
print(super_store_df.shape)
print(super_store_df.info())
print(super_store_df.isnull().sum())
print("Duplicates:", super_store_df.duplicated().sum())

# # =========================
# #  KEY METRICS
# # =========================

total_sales = super_store_df['Sales'].sum()
total_profit = super_store_df['Profit'].sum()

# # =========================
# #  SALES ANALYSIS
# # =========================

sales_by_category = super_store_df.groupby('Category')['Sales'].sum()
sales_by_region= super_store_df.groupby('Region')['Sales'].sum()
sales_by_state = super_store_df.groupby('State')['Sales'].sum()

# # =========================
# #  PROFIT ANALYSIS
# # =========================

profit_by_category = super_store_df.groupby('Category')['Profit'].sum()
profit_by_subcategory = super_store_df.groupby('Sub-Category')['Profit'].sum()
profit_by_proucts = super_store_df.groupby('Product Name')['Profit'].sum()
profit_by_customer_segment = super_store_df.groupby('Segment')['Profit']






# # =========================
# # Which shipping mode is used most
# # =========================

Ship_mode = (super_store_df['Ship Mode']
             .value_counts()
             )
print(Ship_mode)

# =========================
# . Charts
# =========================



# #  DISCOUNT ANALYSIS


discount_profit = (
    super_store_df.groupby("Discount")["Profit"]
    .mean()
    .sort_index()
)

ax = discount_profit.plot(kind="bar")

# Convert 0.1 → 10%, 0.2 → 20%, etc.
ax.set_xticklabels(
    [f"{x:.0%}" for x in discount_profit.index]
)

plt.title("Average Profit by Discount")
plt.xlabel("Discount")
plt.ylabel("Average Profit")
plt.tight_layout()
plt.show()


# #  Changed Sales Over time 

# By The Month:
super_store_df["Order Date"] = pd.to_datetime(super_store_df["Order Date"])

monthly_sales = (
    super_store_df
    .groupby(super_store_df["Order Date"].dt.to_period("M"))["Sales"]
    .sum()
)

print(monthly_sales)

monthly_sales.index = monthly_sales.index.to_timestamp()

plt.figure(figsize=(12, 6))

plt.plot(monthly_sales.index, monthly_sales.values)

plt.title("Monthly Sales Trend")
plt.xlabel("Date")
plt.ylabel("Sales")

plt.tight_layout()
plt.show()

#By the Year

yearly_sales = (
    super_store_df
    .groupby(super_store_df["Order Date"].dt.year)["Sales"]
    .sum()
)

print(yearly_sales)

sales_growth = yearly_sales.pct_change() * 100

print(sales_growth)


# =========================
# . OUTPUT
# =========================


# print("Total Sales:", total_sales)
# print("Total Profit:", total_profit)

# print("\nSales by Category:")
# print(sales_by_category)

# print("\nProfit by Category:")
# print(profit_by_category)

print("\nProfit by Sub-Category:")
print(profit_by_subcategory)

# print("\nProfit by Product:")
# print(profit_by_proucts)

# print("\nProfit by Customer Segment:")
# print(profit_by_customer_segment)

# print("\nSales by Region:")
# print(sales_by_region)

# print("\nSales by State:")
# print(sales_by_state)
