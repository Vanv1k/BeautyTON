package s3

import (
	"context"
	"io"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"

	conf "github.com/Vanv1k/BeautyTON/internal/config"
	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type FileRepository struct {
	client *s3.Client
	bucket string
}

func NewFileRepository(cfg conf.S3Config) (repository.FileRepository, error) {
	awsCfg, err := config.LoadDefaultConfig(context.Background(),
		config.WithRegion(cfg.Region),
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(
			cfg.AccessKeyID, cfg.SecretAccessKey, "")),
	)
	if err != nil {
		return nil, err
	}

	client := s3.NewFromConfig(awsCfg, func(o *s3.Options) {
		if cfg.Endpoint != "" {
			o.BaseEndpoint = aws.String(cfg.Endpoint)
			o.UsePathStyle = true
		}
	})

	return &FileRepository{
		client: client,
		bucket: cfg.Bucket,
	}, nil
}

func (r *FileRepository) Upload(ctx context.Context, file *entity.File, content io.Reader) error {
	_, err := r.client.PutObject(ctx, &s3.PutObjectInput{
		Bucket:      aws.String(r.bucket),
		Key:         aws.String(file.ID),
		Body:        content,
		ContentType: aws.String(file.MimeType),
	})
	return err
}

func (r *FileRepository) Get(ctx context.Context, id string) (*entity.File, io.Reader, error) {
	output, err := r.client.GetObject(ctx, &s3.GetObjectInput{
		Bucket: aws.String(r.bucket),
		Key:    aws.String(id),
	})
	if err != nil {
		return nil, nil, err
	}

	file := &entity.File{
		ID:       id,
		Name:     id,
		Size:     *output.ContentLength,
		MimeType: *output.ContentType,
	}
	return file, output.Body, nil
}
