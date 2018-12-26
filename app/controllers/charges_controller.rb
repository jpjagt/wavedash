class ChargesController < ApplicationController
  before_action :set_amount
  before_action :validate_order

  def new
  end

  def create
    begin
      customer = Stripe::Customer.create(
        source: params[:stripeToken]
      )

      charge = create_charge!("credit card", customer: customer.id)
    rescue Stripe::CardError => e
      failed_payment_callback(e)
      return
    end

    # no CardError, so payment succeeded
    successfull_payment_callback
    return
  end

  def ideal
    begin
      charge = create_charge!("iDeal", source: params[:source])
    rescue StandardError => e
      failed_payment_callback(e)
      return
    end

    if charge.paid
      successfull_payment_callback
      return
    else
      failed_payment_callback
      return
    end
  end

  private

  def create_charge!(payment_type, options)
    return Stripe::Charge.create(
      options.merge(
        amount:      @amount,
        description: "order##{@order.id} [#{@order.quantity} items] by #{@order.address.name} via #{payment_type}",
        currency:    'eur'
      )
    )
  end

  def failed_payment_callback(error = nil)
    flash[:alert] = "<strong>something went wrong...</strong> "

    unless error.nil?
      flash[:alert] += error.message
    end

    redirect_to payment_path
  end

  def successfull_payment_callback
    @order.mark_as_paid!
    redirect_to root_path
  end

  def set_amount
    @amount = @order.stripe_amount
  end

  def validate_order
    if @order.empty?
      redirect_to cart_path
    elsif !@order.valid_address?
      redirect_to checkout_path
    elsif @order.paid?
      redirect_to root_path
    end
  end
end
