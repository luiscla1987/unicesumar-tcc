from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Category, Product, Order, OrderItem
from .serializers import (
    CategorySerializer, ProductSerializer,
    OrderSerializer, OrderItemSerializer
)

# Create your views here.

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category', None)
        if category is not None:
            queryset = queryset.filter(category=category)
        return queryset

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def add_item(self, request, pk=None):
        order = self.get_object()
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        if not product_id:
            return Response(
                {'error': 'Product ID is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        product = get_object_or_404(Product, id=product_id)
        
        if product.stock < quantity:
            return Response(
                {'error': 'Not enough stock available'},
                status=status.HTTP_400_BAD_REQUEST
            )

        order_item, created = OrderItem.objects.get_or_create(
            order=order,
            product=product,
            defaults={'quantity': quantity, 'price': product.price}
        )

        if not created:
            order_item.quantity += quantity
            order_item.save()

        product.stock -= quantity
        product.save()

        return Response(OrderSerializer(order).data)

    @action(detail=True, methods=['post'])
    def remove_item(self, request, pk=None):
        order = self.get_object()
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        if not product_id:
            return Response(
                {'error': 'Product ID is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        product = get_object_or_404(Product, id=product_id)
        order_item = get_object_or_404(OrderItem, order=order, product=product)

        if order_item.quantity <= quantity:
            order_item.delete()
        else:
            order_item.quantity -= quantity
            order_item.save()

        product.stock += quantity
        product.save()

        return Response(OrderSerializer(order).data)

    @action(detail=True, methods=['post'])
    def checkout(self, request, pk=None):
        order = self.get_object()
        if order.status != 'PENDING':
            return Response(
                {'error': 'Order is not in pending status'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not order.items.exists():
            return Response(
                {'error': 'Cannot checkout an empty order'},
                status=status.HTTP_400_BAD_REQUEST
            )

        order.status = 'COMPLETED'
        order.save()

        return Response(
            OrderSerializer(order).data,
            status=status.HTTP_200_OK
        )
