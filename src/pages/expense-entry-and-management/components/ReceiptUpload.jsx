import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReceiptUpload = ({ onReceiptProcessed }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [extractedData, setExtractedData] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = (event) => {
        const file = event?.target?.files?.[0];
        if (file && file?.type?.startsWith('image/')) {
            setUploadedFile(file);
            processReceipt(file);
        }
    };

    const handleDrop = (event) => {
        event?.preventDefault();
        const file = event?.dataTransfer?.files?.[0];
        if (file && file?.type?.startsWith('image/')) {
            setUploadedFile(file);
            processReceipt(file);
        }
    };

    const handleDragOver = (event) => {
        event?.preventDefault();
    };

    const processReceipt = async (file) => {
        setIsProcessing(true);

        try {
            // Simulate OCR processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock extracted data
            const mockData = {
                amount: '24.99',
                merchant: 'Bella Vista Restaurant',
                date: new Date()?.toISOString()?.split('T')?.[0],
                category: 'food',
                items: [
                    { name: 'Margherita Pizza', price: 18.99 },
                    { name: 'Soft Drink', price: 3.50 },
                    { name: 'Tax', price: 2.50 }
                ],
                confidence: 0.92,
                storyContext: `A delightful dining experience at Bella Vista Restaurant becomes part of your food & dining story, representing moments of nourishment and social connection.`
            };

            setExtractedData(mockData);
        } catch (error) {
            console.error('Error processing receipt:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleAcceptData = () => {
        if (extractedData) {
            onReceiptProcessed?.(extractedData);
            resetUpload();
        }
    };

    const resetUpload = () => {
        setUploadedFile(null);
        setExtractedData(null);
        setIsUploading(false);
        setIsProcessing(false);
        if (fileInputRef?.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        })?.format(amount);
    };

    return (
        <div className="bg-card border border-border rounded-lg p-6 shadow-warm">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground">
                        Receipt Scanner
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Upload a receipt to automatically extract expense details
                    </p>
                </div>
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Camera" size={20} className="text-accent" />
                </div>
            </div>
            {!uploadedFile ? (
                <div
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-narrative cursor-pointer"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef?.current?.click()}
                >
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="Upload" size={24} className="text-muted-foreground" />
                    </div>

                    <h4 className="font-medium text-foreground mb-2">
                        Upload Receipt Photo
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop your receipt image here, or click to browse
                    </p>

                    <Button variant="outline" iconName="Camera" iconPosition="left">
                        Choose File
                    </Button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />

                    <p className="text-xs text-muted-foreground mt-4">
                        Supports JPG, PNG, and other image formats
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                            <Icon name="FileImage" size={20} className="text-success" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-foreground">{uploadedFile?.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {(uploadedFile?.size / 1024 / 1024)?.toFixed(2)} MB
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetUpload}
                            iconName="X"
                        />
                    </div>

                    {isProcessing && (
                        <div className="text-center py-8">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                <Icon name="Scan" size={24} className="text-primary" />
                            </div>
                            <h4 className="font-medium text-foreground mb-2">Processing Receipt...</h4>
                            <p className="text-sm text-muted-foreground">
                                Extracting expense details from your receipt
                            </p>
                        </div>
                    )}

                    {extractedData && (
                        <div className="space-y-4">
                            <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                                <div className="flex items-center space-x-2 mb-3">
                                    <Icon name="CheckCircle" size={16} className="text-success" />
                                    <span className="font-medium text-success">
                    Receipt Processed Successfully
                  </span>
                                    <span className="text-xs text-muted-foreground">
                    ({(extractedData?.confidence * 100)?.toFixed(0)}% confidence)
                  </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground">Amount</label>
                                        <p className="font-semibold text-foreground">
                                            {formatCurrency(parseFloat(extractedData?.amount))}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground">Merchant</label>
                                        <p className="font-medium text-foreground">{extractedData?.merchant}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground">Date</label>
                                        <p className="text-foreground">{extractedData?.date}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground">Category</label>
                                        <p className="text-foreground capitalize">{extractedData?.category}</p>
                                    </div>
                                </div>

                                {extractedData?.items && extractedData?.items?.length > 0 && (
                                    <div className="mb-4">
                                        <label className="text-xs font-medium text-muted-foreground mb-2 block">
                                            Items
                                        </label>
                                        <div className="space-y-1">
                                            {extractedData?.items?.map((item, index) => (
                                                <div key={index} className="flex justify-between text-sm">
                                                    <span className="text-foreground">{item?.name}</span>
                                                    <span className="text-muted-foreground">
                            {formatCurrency(item?.price)}
                          </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="p-3 bg-muted/30 rounded-lg mb-4">
                                    <div className="flex items-start space-x-2">
                                        <Icon name="BookOpen" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                                        <p className="text-sm text-muted-foreground">
                                            {extractedData?.storyContext}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={resetUpload}
                                        className="flex-1"
                                    >
                                        Try Another
                                    </Button>
                                    <Button
                                        variant="default"
                                        onClick={handleAcceptData}
                                        className="flex-1"
                                        iconName="Check"
                                        iconPosition="left"
                                    >
                                        Use This Data
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReceiptUpload;